# Wethemachines Platform

**Converge Knowledge, Not Prestige** — Wethemachines is a phase-based, convergence-driven knowledge platform that enables collaborative knowledge formation, anonymous input, cluster synthesis, and multi-signer attestation.

---

## **Table of Contents**

- [Overview](#overview)  
- [Features](#features)  
- [Architecture](#architecture)  
- [Installation](#installation)  
- [Deployment](#deployment)  
- [Usage](#usage)  
- [Governance Principles](#governance-principles)  
- [Contributing](#contributing)  
- [License](#license)  

---

## **Overview**

Wethemachines provides a structured environment for collaborative knowledge creation. Its design prevents prestige capture, allowing ideas to emerge based on merit rather than identity. Contributions progress through distinct phases:

1. **Input Phase** — Anonymous submissions.  
2. **Deliberation Phase** — Pseudonymous discussion and clustering.  
3. **Convergence Phase** — Cluster synthesis into artifacts.  
4. **Attestation Phase** — Identified users validate artifacts.  
5. **Publication Phase** — Fully attested artifacts released publicly.

---

## **Features**

- Anonymous and pseudonymous contribution workflows  
- Real-time cluster visualization and interactive dashboard  
- Artifact synthesis and multi-signer attestation system  
- Serverless API endpoints for clusters, submissions, synthesis, attestation, and cycles  
- Phase-based governance to prevent early influence and prestige capture  
- Vercel-ready deployment with MongoDB Atlas support  

---

## **Architecture**

- **Frontend**: React, context-driven state (`UserContext`, `CycleContext`)  
- **Backend**: Serverless API endpoints (`/api`) deployed on Vercel  
- **Database**: MongoDB Atlas for persistent storage of nodes, clusters, artifacts, and attestations  
- **Deployment**: Vercel monorepo with `vercel.json` routing and build configuration  

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/wethemachines-platform.git
cd wethemachines-platform
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Set environment variables in `.env`:

```env
MONGO_URI=<Your MongoDB Atlas connection string>
NODE_ENV=development
```

---

## **Deployment**

Deploy to Vercel:

```bash
vercel
```

- Set environment variables in Vercel Dashboard:
  - `MONGO_URI`
  - `NODE_ENV=production`
- Optional: connect a custom domain and enable SSL  

---

## **Usage**

- Open the platform in your browser (`vercel.app` or custom domain)  
- Submit anonymously in the **Input Phase**  
- Engage in **Deliberation Phase** clusters  
- Observe **Convergence Phase** artifacts forming  
- Participate in **Attestation Phase** if identified  
- Track live attestation progress and artifact lifecycle  

---

## **Governance Principles**

- Phase-based access control prevents early influence  
- Anonymous input protects against prestige capture  
- Multi-signer attestation ensures accountability without bias  
- Governance rules are embedded in platform architecture, not social norms  

---

## **Contributing**

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request. Follow platform architecture, phase integrity, and governance principles in any modifications.  

---

## **License**

[MIT License](LICENSE)

---

**Tagline:** Converge knowledge, not prestige.
