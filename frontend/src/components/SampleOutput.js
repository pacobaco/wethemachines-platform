import React, { useState } from 'react';
import './SampleOutput.css';

/**
 * SampleOutput Component
 * 
 * Demonstrates the Wethemachines platform with realistic sample data
 * showing all 5 phases of the convergence process
 */

const SampleOutput = () => {
  const [activePhase, setActivePhase] = useState('Input');

  // Sample cycle data
  const sampleCycle = {
    id: 'cycle-2026-09-02',
    phase: activePhase,
    startDate: '2026-09-01',
    endDate: '2026-09-08',
    submissions: 247,
    clusters: 12,
    artifacts: 3,
    attestations: 5,
    attestationThreshold: 3,
    status: 'Active'
  };

  // Sample submissions (anonymous input)
  const sampleSubmissions = [
    {
      id: 'sub-001',
      content: 'AI governance needs decentralized oversight mechanisms to prevent concentration of power in single entities',
      timestamp: '2026-09-02T08:15:00Z',
      nodeType: 'anonymous',
      sentiment: 'neutral'
    },
    {
      id: 'sub-002',
      content: 'Market mechanisms alone cannot solve coordination problems at scale - we need epistemic commons',
      timestamp: '2026-09-02T09:30:00Z',
      nodeType: 'anonymous',
      sentiment: 'analytical'
    },
    {
      id: 'sub-003',
      content: 'Blockchain infrastructure enables transparent and immutable records of knowledge consensus',
      timestamp: '2026-09-02T10:45:00Z',
      nodeType: 'anonymous',
      sentiment: 'positive'
    },
  ];

  // Sample clusters (emergent themes)
  const sampleClusters = [
    {
      id: 'cluster-001',
      label: 'Decentralized Governance Systems',
      submissionCount: 47,
      submissions: sampleSubmissions.slice(0, 2),
      confidence: 0.92,
      tags: ['governance', 'decentralization', 'oversight', 'democracy']
    },
    {
      id: 'cluster-002',
      label: 'Epistemic Infrastructure & Commons',
      submissionCount: 38,
      confidence: 0.85,
      tags: ['knowledge', 'commons', 'coordination', 'infrastructure']
    },
    {
      id: 'cluster-003',
      label: 'Blockchain Transparency & Consensus',
      submissionCount: 51,
      submissions: sampleSubmissions.slice(2),
      confidence: 0.88,
      tags: ['blockchain', 'transparency', 'consensus', 'immutability']
    },
  ];

  // Sample artifacts (convergence outputs)
  const sampleArtifacts = [
    {
      id: 'artifact-001',
      title: 'Framework for Distributed Governance in AI Systems',
      summary: 'A comprehensive framework for implementing decentralized decision-making in AI governance, combining epistemic commons principles with blockchain transparency.',
      evidence: [
        { submissionId: 'sub-001', content: 'AI governance needs decentralized oversight mechanisms...' },
        { submissionId: 'sub-002', content: 'Market mechanisms alone cannot solve coordination problems...' }
      ],
      attestations: [
        { attestorId: 'attester-001', role: 'Domain Expert', timestamp: '2026-09-02T14:00:00Z', signature: 'sig-001' },
        { attestorId: 'attester-002', role: 'Validator', timestamp: '2026-09-02T14:15:00Z', signature: 'sig-002' },
        { attestorId: 'attester-003', role: 'Stakeholder', timestamp: '2026-09-02T14:30:00Z', signature: 'sig-003' }
      ],
      attestationStatus: 'Fully Attested',
      publishDate: '2026-09-02T15:00:00Z'
    },
  ];

  // Sample graph nodes and links
  const graphData = {
    nodes: sampleClusters.map((cluster, idx) => ({
      id: cluster.id,
      label: cluster.label,
      size: cluster.submissionCount,
      group: 'cluster',
      confidence: cluster.confidence
    })),
    links: [
      { source: 'cluster-001', target: 'cluster-002', weight: 0.7 },
      { source: 'cluster-002', target: 'cluster-003', weight: 0.6 },
    ]
  };

  const phases = ['Input', 'Deliberation', 'Convergence', 'Attestation', 'Publication'];

  const getPhaseDescription = (phase) => {
    const descriptions = {
      Input: 'Anonymous submissions from community members',
      Deliberation: 'Pseudonymous discussion and cluster formation',
      Convergence: 'Synthesis of clusters into artifacts',
      Attestation: 'Multi-signer validation of artifacts',
      Publication: 'Release of fully attested artifacts'
    };
    return descriptions[phase] || '';
  };

  return (
    <div className="sample-output-container">
      <header className="sample-header">
        <h1>🔄 Wethemachines Platform - Sample Output</h1>
        <p className="tagline">Converge knowledge, not prestige</p>
      </header>

      {/* Cycle Overview */}
      <section className="cycle-overview">
        <h2>Current Convergence Cycle</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{sampleCycle.submissions}</div>
            <div className="stat-label">Submissions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{sampleCycle.clusters}</div>
            <div className="stat-label">Clusters</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{sampleCycle.artifacts}</div>
            <div className="stat-label">Artifacts</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{sampleCycle.attestations}/{sampleCycle.attestationThreshold}</div>
            <div className="stat-label">Attestations</div>
          </div>
        </div>
      </section>

      {/* Phase Selector */}
      <section className="phase-selector">
        <h2>Platform Phases</h2>
        <div className="phase-tabs">
          {phases.map((phase) => (
            <button
              key={phase}
              className={`phase-tab ${activePhase === phase ? 'active' : ''}`}
              onClick={() => setActivePhase(phase)}
            >
              <span className="phase-number">{phases.indexOf(phase) + 1}</span>
              <span className="phase-name">{phase}</span>
            </button>
          ))}
        </div>
        <p className="phase-description">{getPhaseDescription(activePhase)}</p>
      </section>

      {/* Phase-Specific Content */}
      <section className="phase-content">
        {activePhase === 'Input' && (
          <div className="content-section">
            <h3>📝 Anonymous Input Phase</h3>
            <p>Community members submit ideas anonymously without prestige bias.</p>
            <div className="submissions-list">
              {sampleSubmissions.map((sub) => (
                <div key={sub.id} className="submission-card">
                  <div className="submission-content">{sub.content}</div>
                  <div className="submission-meta">
                    <span className="timestamp">{new Date(sub.timestamp).toLocaleString()}</span>
                    <span className={`sentiment ${sub.sentiment}`}>{sub.sentiment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePhase === 'Deliberation' && (
          <div className="content-section">
            <h3>💬 Deliberation Phase</h3>
            <p>Pseudonymous discussion and clustering of submissions.</p>
            <div className="deliberation-view">
              {sampleSubmissions.map((sub) => (
                <div key={sub.id} className="discussion-thread">
                  <div className="thread-header">
                    <span className="author">Pseudonym-{Math.random().toString(36).substr(2, 5).toUpperCase()}</span>
                    <span className="timestamp">{new Date(sub.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="thread-content">{sub.content}</div>
                  <div className="thread-actions">
                    <button>↑ Agree ({Math.floor(Math.random() * 20)})</button>
                    <button>→ Relate ({Math.floor(Math.random() * 15)})</button>
                    <button>? Question ({Math.floor(Math.random() * 8)})</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePhase === 'Convergence' && (
          <div className="content-section">
            <h3>🎯 Convergence Phase</h3>
            <p>Clusters synthesized into coherent artifacts.</p>
            <div className="clusters-view">
              {sampleClusters.map((cluster) => (
                <div key={cluster.id} className="cluster-card">
                  <div className="cluster-header">
                    <h4>{cluster.label}</h4>
                    <div className="cluster-metrics">
                      <span className="badge">{cluster.submissionCount} submissions</span>
                      <span className="confidence-badge" style={{ width: `${cluster.confidence * 100}%` }}>
                        {(cluster.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  </div>
                  <div className="cluster-tags">
                    {cluster.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="graph-visualization">
              <h4>Knowledge Graph</h4>
              <p className="visualization-note">
                Clusters: {graphData.nodes.length} | Connections: {graphData.links.length}
              </p>
              <div className="mock-graph">
                {graphData.nodes.map((node, idx) => (
                  <div
                    key={node.id}
                    className="graph-node"
                    style={{
                      left: `${20 + idx * 30}%`,
                      top: `${30 + Math.sin(idx) * 20}%`,
                      width: `${node.size / 10}px`,
                      height: `${node.size / 10}px`,
                    }}
                  >
                    <div className="node-label">{node.label.substring(0, 15)}...</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activePhase === 'Attestation' && (
          <div className="content-section">
            <h3>✅ Attestation Phase</h3>
            <p>Identified users validate and sign artifacts.</p>
            {sampleArtifacts.map((artifact) => (
              <div key={artifact.id} className="artifact-card">
                <div className="artifact-header">
                  <h4>{artifact.title}</h4>
                  <span className={`status-badge ${artifact.attestationStatus.toLowerCase().replace(' ', '-')}`}>
                    {artifact.attestationStatus}
                  </span>
                </div>
                <p className="artifact-summary">{artifact.summary}</p>
                <div className="attestations-section">
                  <h5>Attestations ({artifact.attestations.length}/{3})</h5>
                  <div className="attestation-progress">
                    <div
                      className="progress-bar"
                      style={{ width: `${(artifact.attestations.length / 3) * 100}%` }}
                    ></div>
                  </div>
                  <div className="attestors-list">
                    {artifact.attestations.map((attestation, idx) => (
                      <div key={idx} className="attestor-item">
                        <span className="attestor-role">{attestation.role}</span>
                        <span className="attestor-time">{new Date(attestation.timestamp).toLocaleTimeString()}</span>
                        <span className="attestor-sig" title={attestation.signature}>✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activePhase === 'Publication' && (
          <div className="content-section">
            <h3>📢 Publication Phase</h3>
            <p>Fully attested artifacts released to the public.</p>
            {sampleArtifacts.map((artifact) => (
              <div key={artifact.id} className="published-artifact">
                <div className="published-header">
                  <h4>{artifact.title}</h4>
                  <span className="publish-date">Published: {new Date(artifact.publishDate).toLocaleDateString()}</span>
                </div>
                <p className="artifact-summary">{artifact.summary}</p>
                <div className="evidence-section">
                  <h5>Supporting Evidence</h5>
                  <ul>
                    {artifact.evidence.map((ev) => (
                      <li key={ev.submissionId}>{ev.content}</li>
                    ))}
                  </ul>
                </div>
                <div className="attestors-section">
                  <h5>Attestors ({artifact.attestations.length})</h5>
                  <div className="attestors-grid">
                    {artifact.attestations.map((attestor, idx) => (
                      <div key={idx} className="attestor-badge">
                        <span className="role">{attestor.role}</span>
                        <span className="signature">{attestor.signature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="sample-footer">
        <p>© 2026 Wethemachines | Converge knowledge, not prestige</p>
      </footer>
    </div>
  );
};

export default SampleOutput;
