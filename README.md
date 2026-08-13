# Abraham Kaunda — Computer Science Portfolio

A responsive static portfolio presenting practical projects across systems, security and data.

**Live website:** [abrahamkaunda-create.github.io](https://abrahamkaunda-create.github.io/)

## Selected projects

### Incident Replay Lab

A browser-based learning simulation that replays synthetic Windows Security and pfSense firewall events, applies four transparent detection rules and groups supporting activity into incidents. The React and TypeScript interface includes replay controls, explainable severity scoring, a device-local investigation workflow and 27 automated tests without presenting the project as a live or production security platform.

[Read the case study](https://abrahamkaunda-create.github.io/incident-replay-lab.html) · [Open the interactive lab](https://abrahamkaunda-create.github.io/incident-replay-lab/) · [View source](https://github.com/abrahamkaunda-create/incident-replay-lab)

### Predictive Maintenance Analytics

Predictive maintenance analytics dashboard built with Python, DuckDB, scikit-learn and Streamlit using the synthetic UCI AI4I 2020 dataset. It also demonstrates validated pandas and Parquet preparation, leakage-safe modelling, evaluation for an imbalanced target and unit testing without claiming production readiness.

[Open the live dashboard](https://abrahamkaunda-predictive-maintenance.streamlit.app/) · [View source](https://github.com/abrahamkaunda-create/predictive-maintenance-analytics)

### IT Operations Toolkit

A live multipage Python and Streamlit application containing an IPv4 subnet calculator, deterministic text-log analyser and transparent support-ticket prioritiser. Reusable logic is separated from the interface and covered by 30 unit tests.

[Open the live toolkit](https://it-operations-toolkit-apygrmvbleecnclt6dmgfc.streamlit.app/) · [View source](https://github.com/abrahamkaunda-create/it-operations-toolkit)

### Windows IT Support and Active Directory Lab

An isolated VMware lab using Windows Server 2025, Windows 11 Enterprise Evaluation, Active Directory, DNS, Group Policy, SMB/NTFS permissions and PowerShell. The dedicated case study links retained screenshots to the outcomes they support and clearly states evidence limitations.

[Read the case study](https://abrahamkaunda-create.github.io/windows-ad-lab.html) · [View source](https://github.com/abrahamkaunda-create/windows-ad-lab)

### pfSense Network Security Lab

An evidence-based case study of an undergraduate pfSense CE 2.7.2 VMware lab. It covers DHCP, DNS, firewall policy, NAT, multi-WAN configuration and a retrospective on an unsuccessful WireGuard handshake.

[Read the case study](https://abrahamkaunda-create.github.io/pfsense-project.html)

### Personal portfolio website

This responsive website uses accessible navigation, a persistent dark-mode preference, subtle reduced-motion-aware animation, an accessible image lightbox and layouts for desktop and mobile devices. Project evidence is served as optimised WebP images, and the site includes sharing metadata and a custom 404 page.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Git and GitHub
- GitHub Pages

The portfolio has no frontend framework, package manager, database or server-side dependency.

## Project structure

```text
.
├── assets/
│   ├── windows-ad/                     # Selected Active Directory lab evidence
│   ├── windows-ad-lab-topology.svg      # Recreated Windows lab topology
│   ├── pfsense-*.webp                   # Optimised pfSense lab evidence
│   ├── pfsense-lab-topology.svg         # Recreated pfSense lab topology
│   ├── portfolio-social-preview.png     # Open Graph and social preview card
│   └── favicon.svg                      # Website icon
├── .nojekyll                            # Disables Jekyll processing
├── index.html                           # Main portfolio page
├── 404.html                             # Branded page-not-found response
├── windows-ad-lab.html                  # Windows lab case study
├── pfsense-project.html                 # pfSense lab case study
├── incident-replay-lab.html             # Incident Replay Lab case study
├── script.js                            # Theme, scroll reveal and image lightbox
├── styles.css                           # Design, animation and responsive layout
└── README.md                            # Repository documentation
```

## Run locally

No installation is required. From the repository directory, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

GitHub Pages publishes the website from the `main` branch. No custom GitHub Actions workflow is required.

Shared CSS and JavaScript references use a small version query when their contents change. This gives browsers a new asset URL after a deployment while keeping the site fully static; GitHub Pages controls the remaining short-lived HTML cache.

## Contact

**Abraham Kaunda**  
London, United Kingdom  
[abrahamkaunda@gmail.com](mailto:abrahamkaunda@gmail.com)
