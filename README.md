# Abraham Kaunda — Computer Science Portfolio

A responsive personal portfolio where I share what I build, what I am learning and the technical problems I have explored.

## About the portfolio

I am a BSc (Hons) Computer Science graduate with interests across web development, software, networking and systems. This repository is intended to grow as I complete projects that are real, tested and worth explaining.

## Current projects

### Personal portfolio website

This website is itself a project: a responsive static site built with readable HTML and CSS, managed with GitHub and automatically deployed through GitHub Actions and GitHub Pages.

### Network security evaluation using pfSense

My final-year university project used a virtualised network laboratory to evaluate pfSense, an open-source firewall and routing platform. The work covered firewall rules, NAT, network segmentation, IDS/IPS testing, OpenVPN/IPsec, latency and throughput assessment, and documentation of technical limitations and trade-offs.

## Technical areas represented

- HTML and CSS
- Python and basic SQL
- Git and GitHub
- VMware and VirtualBox
- TCP/IP, DNS, DHCP and NAT
- pfSense, firewall rules and network segmentation
- Troubleshooting and technical documentation

## Technology

The portfolio deliberately uses plain HTML and CSS. It has no framework, package manager, database, server-side code or external runtime dependency. This keeps the source easy to inspect and portable across static hosting providers.

## Project structure

```text
.
├── .github/workflows/deploy-pages.yml  # Automatic GitHub Pages deployment
├── assets/favicon.svg                  # Browser icon
├── .nojekyll                           # Serve files without Jekyll processing
├── index.html                          # Site structure and content
├── styles.css                          # Design and responsive layout
└── README.md                           # Project documentation
```

## Run locally

No installation is required. Open `index.html` directly in a browser or serve the directory locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

The included workflow publishes the site through GitHub Pages whenever changes are pushed to the `main` branch.

1. Open **Settings → Pages** in GitHub.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open the **Actions** tab to follow the deployment.

## Content accuracy

This portfolio is intentionally limited to skills and project work I can explain honestly. It does not claim employers, certifications or achievements that are not part of my background.

## Contact

Abraham Kaunda  
London, United Kingdom  
[abrahamkaunda@gmail.com](mailto:abrahamkaunda@gmail.com)
