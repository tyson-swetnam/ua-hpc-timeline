// Embedded markdown content for PDF generation
// This solves the CORS/file:// protocol issue when opening the HTML directly

const embeddedMarkdown = {
    'uarizona_hpc_resources.md': `# University of Arizona HPC Computing Resources

## Documentation Sources

**Primary Documentation:**
- Main HPC Documentation: https://hpcdocs.hpc.arizona.edu/
- Compute Resources: https://hpcdocs.hpc.arizona.edu/resources/compute_resources/
- HPC Quick Start Guide: https://uarizona.atlassian.net/wiki/spaces/UAHPC/pages/75989999/HPC+Quick+Start
- Secure HPC (Soteria): https://uarizona.atlassian.net/wiki/spaces/UAHPC/pages/75989667/Secure+HPC
- HPC Overview (Confluence): https://public.confluence.arizona.edu/display/UAHPC/HPC+Supercomputer+Overview

---

## Main HPC Clusters

**Puma** (Penguin Altus XE2242, 2020): 300 standard nodes, 5 high-memory nodes, 15 GPU nodes. Total: 29,512 CPU cores, 169.7 TB system memory, 60 GPUs (V100S + A100 MIG). GPU Performance: ~942 TFLOPS FP32, ~7.5 PFLOPS Tensor. Processor: 2x AMD EPYC 7642 48-core (Rome). Interconnect: 100 Gb/s Mellanox Infiniband HDR. Monthly Allocation: 100,000 CPU-hours.

**Ocelote** (Lenovo NeXtScale nx360 M5, 2016): 360 standard nodes, 1 high-memory node, 60 GPU nodes. Total: 11,724 CPU cores, 83.3 TB system memory, 95 P100 GPUs. GPU Performance: ~1.01 PFLOPS FP32, ~2.01 PFLOPS FP16. Processor: 2x Xeon E5-2695v3/v4 14-core (Haswell/Broadwell). Interconnect: 56 Gb/s Mellanox Infiniband FDR. Monthly Allocation: 70,000 CPU-hours.

**El Gato** (IBM System X iDataPlex dx360 M4, 2013): 118 standard nodes. Total: 1,888 CPU cores, 23.5 TB system memory. No GPU nodes. Processor: 2x Xeon E5-2650v2 8-core (Ivy Bridge). Interconnect: 56 Gb/s Mellanox Infiniband FDR. Monthly Allocation: 7,000 CPU-hours.

**Soteria** (HIPAA Compliant, 2023): 4 standard compute nodes, 2 GPU nodes. Total: 564 CPU cores, ~3 TB system memory, 8 V100 GPUs. GPU Performance: 125.6 TFLOPS FP32, 1 PFLOPS Tensor. Requires special security training and VPN access.

## Total System Computational Power

Combined UA HPC resources: 865 nodes, 43,688 CPU cores, 163 GPUs, ~256 TB system memory. Total GPU performance: ~2.08 PFLOPS FP32, ~10.5 PFLOPS AI/Tensor performance.`,

    'cyverse_ua_resources.md': `# CyVerse (University of Arizona)

CyVerse is a cyberinfrastructure project funded by NSF providing cloud computing, data storage, and analysis platforms for life sciences research.

## Infrastructure Overview

**Vice/K8s Cluster**: 44 nodes, 3,676 CPU cores, 14 TB RAM. GPU inventory includes 12× GTX 1080 Ti, 8× RTX 2080, 5× Tesla T4, 4× A100 80GB PCIe, 26× A16, 4× L40s.

**Tombstone Cluster**: 25 nodes, 504 CPU cores, 6.25 TB RAM.

**iRODS Data Store**: 38 nodes, 680 CPU cores, 10 TB RAM. Storage: 8.18 PB with nightly mirror to TACC (6+ PB).

**Total GPU Performance**: ~909 TFLOPS FP32, ~3.5 PFLOPS Tensor/AI. Total: 59 GPUs, 4,860 CPU cores, 30.25 TB memory, 10.7 PB total storage (8.18 PB iRODS + 2.1 PB OSN + 0.6 PB other).

## Key Features

Cloud-native infrastructure for reproducible science. Integration with national resources including Jetstream2 and TACC. Support for containerized workflows, Jupyter notebooks, and data-intensive bioinformatics. Open Science Network (OSN) integration for public data sharing.`,

    'asu_hpc_resources.md': `# Arizona State University HPC Resources

ASU operates multiple HPC systems serving research computing needs across the university.

## Major Systems

**Sol Supercomputer** (2022): AMD EPYC-based system with 21,000 CPU cores and 252 GPUs (224× A100 80GB, 15× A30, 10× H100, 1× GH200, 2× MI200). Primary research computing resource.

**Phoenix/Agave** (2018): Legacy system with 17,200 CPU cores and 360× V100 GPUs. Still in production for many workloads.

**Secure HPC** (2022): 1,700 CPU cores, 20 GPUs for HIPAA and sensitive data workloads.

## Total Resources

Combined: 39,900 CPU cores, 632 GPUs, 203 TB system memory. Total GPU performance: ~12 PFLOPS FP32, ~150 PFLOPS Tensor/AI. Storage: 18 PB total (4 PB BeeGFS, 2 PB PowerScale, 10 PB Network, 2 PB Home).`,

    'nau_hpc_resources.md': `# Northern Arizona University HPC Resources

## Monsoon Supercomputer

NAU's primary research computing resource deployed in 2020.

**CPU Nodes**: 5,768 CPU cores across multiple node types with varying memory configurations.

**GPU Nodes**: 172 CPU cores + 24 GPUs total:
- 4× V100-SXM2 16GB
- 4× A100 40GB
- 12× K80
- 4× P100-PCIE 16GB

## Total Resources

5,940 total CPU cores, 24 GPUs, ~14 TB system memory. GPU Performance: ~288 TFLOPS FP32, ~1.75 PFLOPS Tensor/AI. Storage: 2.3 PB (Lustre scratch + ZFS project storage).`,

    'tacc_jetstream2_hpc_resources.md': `# CyVerse Partnership: Jetstream-2 and TACC Resources

CyVerse partnerships with Jetstream-2 and TACC provide access to over 50 petaFLOPS of computing power through ACCESS-CI allocations.

## Jetstream-2 (NSF Cloud at Indiana University)

**Total Capacity**: 538 nodes, 67,584 CPU cores, 8 petaFLOPS, 14 PB Ceph storage, 100 Gbps networking.

**GPU Resources**: 488 total GPUs
- 360× A100 40GB SXM4: 3.5 PFLOPS FP64, 112 PFLOPS Tensor
- 96× H100 80GB SXM5 (NAIRR): 3.3 PFLOPS FP64, 190 PFLOPS Tensor
- 32× L40S 48GB: Optimized for multi-modal AI

**Access**: Via ACCESS-CI allocations (Explore: 400K SU, Discover: 1.5M SU, Accelerate: 3M SU). Cloud-native OpenStack infrastructure with flexible VM configurations.

## TACC Systems

**Frontera** (2019): 468,608 CPU cores, 360 RTX 5000 GPUs, 38.75 peak PFLOPS. Largest academic supercomputer in US.

**Stampede3** (2024): ~200,000 CPU cores, 96× H100, 80× Intel Ponte Vecchio GPUs, ~10 peak PFLOPS. Intel Xeon MAX with HBM2e memory.

**Lonestar6** (2022): 82,816 CPU cores, 252× A100, 8× H100 GPUs, 3 peak PFLOPS. AMD EPYC-based with liquid immersion cooling.

**Vista** (2024): 80,064 CPU cores, 600× H200 96GB GPUs, 44.9 peak PFLOPS. ARM-based (NVIDIA Grace Hopper) with unified memory architecture.

**Combined TACC**: 1,884 GPUs, ~1.2 exaFLOPS AI performance. All systems share Stockyard global filesystem (1TB per-user). CyVerse data store mirror: 6+ PB with nightly replication.

**Total ACCESS-CI Resources**: Over 2,500 GPUs available to UA researchers, including 800× H100/H200 latest-generation accelerators.`,

    'peer_universities_hpc.md': `# Peer University HPC Resources

## University of Colorado Boulder

**Alpine** (2021): 28,080 CPU cores, 222 GPUs (mix of A100 and V100), ~168 TB memory. ~5.2 PFLOPS FP32, ~58.7 PFLOPS Tensor. NSF-funded resource serving CU system and regional partners.

## University of Utah

**Notchpeak** (Multiple generations): 45,000 CPU cores, 280 GPUs, ~166 TB memory, 28 PB storage. ~4.7 PFLOPS FP32, ~32.5 PFLOPS Tensor. Diverse GPU inventory including A100, V100, and specialized accelerators.

## Texas A&M University

**Grace** (2021): 55,000 CPU cores, 396 GPUs, ~420 TB memory, 24.7 PB storage. ~6.7 PFLOPS FP32, ~73.8 PFLOPS Tensor. One of largest academic HPC installations in Texas. Major NVIDIA GPU deployment.

## Comparison Summary

All peer institutions have made significant investments in GPU computing for AI/ML workloads. Most recent deployments (2021-2024) focus on A100/H100 architectures. Combined with ACCESS-CI resources, researchers have access to world-class computing infrastructure regardless of local institutional capacity.`
};
