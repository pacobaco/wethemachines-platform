import React, { useEffect, useState, useContext } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import api from '../services/api';
import { CycleContext } from '../contexts/CycleContext';
import { UserContext } from '../contexts/UserContext';

const AnimatedConvergenceDashboard = () => {
  const { cycle } = useContext(CycleContext);
  const { user } = useContext(UserContext);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [artifact, setArtifact] = useState(null);
  const [collapsedClusters, setCollapsedClusters] = useState({});

  useEffect(() => {
    if (!cycle) return;
    const fetchGraphAndArtifact = async () => {
      try {
        const clustersRes = await api.get('/clusters');
        const artifactRes = await api.get('/synthesis/latest');
        setArtifact(artifactRes.data);
        const nodes = []; const links = [];
        clustersRes.data.forEach((cluster, ci) => {
          const clusterId = `cluster-${ci}`; nodes.push({ id: clusterId, name: cluster.clusterName, group: 'cluster' });
          const isCollapsed = collapsedClusters[clusterId];
          if (!isCollapsed) {
            cluster.submissionIds.forEach((sub, si) => {
              const showSubmission =
                (cycle.phase === 'Input' && sub.nodeType === 'anonymous') ||
                (cycle.phase === 'Deliberation' && sub.nodeType === 'pseudonymous');
              if (showSubmission) { nodes.push({ id: sub._id, name: `Node ${si}`, group: 'submission' }); links.push({ source: sub._id, target: clusterId }); }
            });
          }
        });
        setGraphData({ nodes, links });
      } catch (err) { console.error(err); }
    };
    fetchGraphAndArtifact();
    const interval = setInterval(fetchGraphAndArtifact, 3000);
    return () => clearInterval(interval);
  }, [cycle, collapsedClusters]);

  const toggleCluster = (clusterId) => setCollapsedClusters(prev => ({ ...prev, [clusterId]: !prev[clusterId] }));

  const handleAttest = async () => {
    if (!artifact || !user) return;
    try { await api.post('/attestation', { artifactId: artifact._id, attestorId: user._id, role: 'Validator', signature: `signature-${Date.now()}` }); } catch (err) { console.error(err); }
  };

  const nodePaint = (node, ctx, globalScale) => {
    const label = node.name; ctx.font = `${12 / globalScale}px Sans-Serif`;
    if (node.group === 'cluster') ctx.fillStyle = '#4a90e2';
    if (node.group === 'submission') { ctx.fillStyle = cycle.phase === 'Input' ? '#f5a623' : '#50e3c2'; }
    ctx.beginPath(); ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false); ctx.fill();
    ctx.fillStyle = '#000'; ctx.fillText(label, node.x + 6, node.y + 3);
  };

  return (
    <div style={{ display: 'flex', height: '90vh' }}>
      <div style={{ flex: 1, borderRight: '1px solid #ccc' }}>
        <h3>Cluster Graph (Phase: {cycle ? cycle.phase : 'Loading...'})</h3>
        <ForceGraph2D graphData={graphData} nodeAutoColorBy="group" nodeLabel="name" linkDirectionalArrowLength={3} linkDirectionalArrowRelPos={1} nodeCanvasObject={nodePaint} onNodeClick={(node) => { if (node.group === 'cluster') toggleCluster(node.id); }} cooldownTicks={100} />
        <p>Click cluster node to collapse/expand submissions</p>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        {artifact ? (
          <>
            <h3>{artifact.title}</h3>
            <p>{artifact.summary}</p>
            <h4>Evidence:</h4>
            <ul>{artifact.evidence.map((e) => (<li key={e.submissionId}>{e.content}</li>))}</ul>
            <p>Status: {artifact.attestationStatus}</p>
            {user.role === 'identified' && cycle.phase === 'Attestation' && (<button onClick={handleAttest}>Attest Artifact</button>)}
            <p>Current Signers: {artifact.attestations.length}</p>
            <div style={{ marginTop: '10px', height: '20px', background: '#eee', width: '100%' }}>
              <div style={{ height: '100%', width: `${Math.min((artifact.attestations.length / 3) * 100, 100)}%`, background: '#4a90e2', transition: 'width 0.5s' }} />
            </div>
            <p>3 attestations required for Full Attestation</p>
          </>
        ) : (<p>Loading artifact...</p>)}
      </div>
    </div>
  );
};

export default AnimatedConvergenceDashboard;
