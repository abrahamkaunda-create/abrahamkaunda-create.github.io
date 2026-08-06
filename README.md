# Abraham Kaunda — Computer Science Portfolio

A responsive portfolio presenting my technical interests, practical projects and ongoing development as a Computer Science graduate.

**Live website:** [abrahamkaunda-create.github.io](https://abrahamkaunda-create.github.io/)

## Projects

### IT Operations Toolkit

A live multipage Python and Streamlit application containing an IPv4 subnet calculator, deterministic text-log analyser and transparent support-ticket prioritiser. Reusable logic is separated from the interface and covered by 30 unit tests.

[Open the live toolkit](https://it-operations-toolkit-apygrmvbleecnclt6dmgfc.streamlit.app/) · [View the source repository](https://github.com/abrahamkaunda-create/it-operations-toolkit)

### Personal portfolio website

A responsive static website built to present my work clearly. It includes accessible navigation, a persistent dark-mode preference and layouts for desktop and mobile devices.

### pfSense Network Security Lab: Configuration and Troubleshooting

A recruiter-facing case study of my final-year university project using pfSense CE 2.7.2 in a VMware laboratory. It covers DHCP and DNS services, firewall policy, NAT, a two-gateway Tier 1 group and WireGuard configuration.

The page clearly separates configuration from verified outcomes. Its main troubleshooting retrospective explains why the retained WireGuard evidence supports an unsuccessful handshake—not a working remote-access VPN—and how I would investigate the issue now.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Actions and GitHub Pages

The portfolio is a static website with no frontend framework, package manager, database or server-side dependency.

## Project structure

```text
.
├── .github/workflows/deploy-pages.yml  # GitHub Pages deployment workflow
├── assets/
│   ├── favicon.svg                     # Website icon
│   ├── pfsense-dhcp.png                # Retained DHCP configuration screenshot
│   ├── pfsense-lab-topology.svg         # Recreated, simplified lab topology
│   ├── pfsense-multi-wan.png            # Retained Tier 1 gateway-group status
│   ├── pfsense-wireguard-nat.png        # Retained outbound NAT configuration
│   └── pfsense-wireguard-status.png     # Redacted unsuccessful handshake evidence
├── .nojekyll                           # Disables Jekyll processing
├── index.html                          # Main portfolio page
├── pfsense-project.html                # pfSense project case study
├── script.js                           # Dark-mode preference and controls
├── styles.css                          # Design and responsive layout
└── README.md                           # Repository documentation
```

## Run locally

No installation is required. From the repository directory, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Deployment

Changes pushed to the `main` branch are published to GitHub Pages through the included GitHub Actions workflow.

## Contact

**Abraham Kaunda**  
London, United Kingdom  
[abrahamkaunda@gmail.com](mailto:abrahamkaunda@gmail.com)
