# University of Arizona HPC Computing Resources

## Documentation Sources

**Primary Documentation:**
- Main HPC Documentation: https://hpcdocs.hpc.arizona.edu/
- Compute Resources: https://hpcdocs.hpc.arizona.edu/resources/compute_resources/
- HPC Quick Start Guide: https://uarizona.atlassian.net/wiki/spaces/UAHPC/pages/75989999/HPC+Quick+Start
- Secure HPC (Soteria): https://uarizona.atlassian.net/wiki/spaces/UAHPC/pages/75989667/Secure+HPC
- HPC Overview (Confluence): https://public.confluence.arizona.edu/display/UAHPC/HPC+Supercomputer+Overview

---

## Main HPC Clusters

| Cluster | Model | Year Purchased | Standard CPU Nodes | High Memory Nodes | GPU Nodes | Total Cores | Total System Memory |
|---------|-------|----------------|-------------------|-------------------|-----------|-------------|---------------------|
| **Puma** | Penguin Altus XE2242 | 2020 | 300 (192 standard + 108 buy-in) | 5 (3 standard + 2 buy-in) | 15 (9 standard + 6 buy-in) | 29,512 | 169.7 TB |
| **Ocelote** | Lenovo NeXtScale nx360 M5 | 2016 (2018 GPU nodes) | 360 | 1 | 60 (25 single GPU + 35 dual GPU) | 11,724 | 83.3 TB |
| **El Gato** | IBM System X iDataPlex dx360 M4 | 2013 | 118 | 0 | 0 | 1,888 | 23.5 TB |

## Detailed Node Specifications

### Puma

| Node Type | Number of Nodes | CPUs/Node | RAM/CPU | CPU RAM/Node | GPUs/Node | GPU Type | RAM/GPU | Total GPUs |
|-----------|-----------------|-----------|---------|--------------|-----------|----------|---------|------------|
| Standard | 300 | 94 | 5 GB | 470 GB | - | - | - | - |
| High Memory | 5 | 94 | 32 GB | 3,008 GB | - | - | - | - |
| GPU | 15 | 94 | 5 GB | 470 GB | 4 | V100S + A100 MIG | 32 GB (V100S) / 20 GB (MIG) | 60 |

**Processor:** 2x AMD EPYC 7642 48-core (Rome)  
**Interconnect:** 100 Gb/s Mellanox Infiniband HDR node-to-node; 25 Gb/s Ethernet to storage  
**Monthly Allocation:** 100,000 CPU-hours

**GPU Performance:**
- **V100S GPUs** (most nodes): 15.7 TFLOPS FP32, 7.8 TFLOPS FP64, 125 TFLOPS Tensor Cores (deep learning)
- **A100 MIG slices** (12 slices): 20 GB memory each, derived from A100 GPUs with 19.5 TFLOPS FP32, 9.7 TFLOPS FP64, 312 TFLOPS Tensor Cores (with sparsity)
- **Total GPU Compute Power (Puma):** ~942 TFLOPS FP32, ~468 TFLOPS FP64, ~7.5 PFLOPS Tensor performance (deep learning)

### Ocelote

| Node Type | Number of Nodes | CPUs/Node | RAM/CPU | CPU RAM/Node | GPUs/Node | GPU Type | RAM/GPU | Total GPUs |
|-----------|-----------------|-----------|---------|--------------|-----------|----------|---------|------------|
| Standard | 360 | 28 | 6 GB | 168 GB | - | - | - | - |
| High Memory | 1 | 48 | 41 GB | 1,968 GB | - | - | - | - |
| Single GPU | 25 | 28 | 8 GB | 224 GB | 1 | P100 | 16 GB | 25 |
| Dual GPU | 35 | 28 | 8 GB | 224 GB | 2 | P100 | 16 GB | 70 |

**Processor:** 2x Xeon E5-2695v3 14-core (Haswell) or 2x Xeon E5-2695v4 14-core (Broadwell); High-memory: 4x Xeon E7-4850v2 12-core (Ivy Bridge)  
**Interconnect:** 56 Gb/s Mellanox Infiniband FDR node-to-node; 10 Gb Ethernet node-storage  
**Monthly Allocation:** 70,000 CPU-hours  
**GPU Limit:** Maximum 10 GPUs simultaneously per research group

**GPU Performance:**
- **P100 GPUs:** 10.6 TFLOPS FP32, 5.3 TFLOPS FP64, 21.2 TFLOPS FP16
- **Total GPU Compute Power (Ocelote):** ~1.01 PFLOPS FP32, 503.5 TFLOPS FP64, ~2.01 PFLOPS FP16

### El Gato

| Node Type | Number of Nodes | CPUs/Node | RAM/CPU | CPU RAM/Node |
|-----------|-----------------|-----------|---------|--------------|
| Standard | 118 | 16 | 4 GB | 64 GB |

**Processor:** 2x Xeon E5-2650v2 8-core (Ivy Bridge)  
**Interconnect:** 56 Gb/s Mellanox Infiniband FDR node-to-node; 10 Gb Ethernet node-storage  
**Monthly Allocation:** 7,000 CPU-hours  
**Note:** No GPU nodes available

## Secure HPC Cluster

### Soteria (HIPAA Compliant)

| Node Type | Number of Nodes | CPUs/Node | RAM/Node | GPUs/Node | GPU Type | RAM/GPU |
|-----------|-----------------|-----------|----------|-----------|----------|---------|
| Standard Compute | 4 | 94 | 512 GB | - | - | - |
| GPU | 2 | 94 | 512 GB | 4 | V100 | 32 GB |

**Access:** Requires Soteria VPN connection (vpn.arizona.edu/soteria)  
**Web Interface:** https://ondemand-hipaa.hpc.arizona.edu  
**Command Line:** shell.cougar.hpc.arizona.edu  
**Monthly Allocation:** 100,000 CPU-hours

**GPU Performance:**
- **V100 GPUs:** 15.7 TFLOPS FP32, 7.8 TFLOPS FP64, 125 TFLOPS Tensor Cores (deep learning)
- **Total GPU Compute Power (Soteria):** 125.6 TFLOPS FP32, 62.4 TFLOPS FP64, 1 PFLOPS Tensor performance

**Special Requirements:**
- HIPAA Essentials training
- Information Security: Insider Threat Awareness training
- Information Security Awareness Certification
- Dedicated (non-shared) computer with updated OS and anti-virus
- Strong password (minimum 8 characters)

**Node Names:**
- Standard: r1u26n1, r1u27n1, r1u28n1, r1u29n1
- GPU: r1u30n1, r1u32n1

## GPU Performance Summary by Type

| GPU Model | FP32 Performance | FP64 Performance | Tensor Core / FP16 | Memory | Locations |
|-----------|------------------|------------------|--------------------|---------|-----------|
| **NVIDIA P100** | 10.6 TFLOPS | 5.3 TFLOPS | 21.2 TFLOPS (FP16) | 16 GB HBM2 | Ocelote (95 GPUs) |
| **NVIDIA V100** | 15.7 TFLOPS | 7.8 TFLOPS | 125 TFLOPS (Tensor) | 16-32 GB HBM2 | Puma, Soteria (68 GPUs) |
| **NVIDIA A100 MIG** | 19.5 TFLOPS* | 9.7 TFLOPS* | 312 TFLOPS* (Tensor) | 20 GB HBM2 | Puma (12 MIG slices) |

*Performance values represent the full A100 GPU; MIG slices provide fractional performance

## Total System Computational Power

| Cluster | Total Nodes | Total CPU Cores | Total GPUs | System Memory | GPU FP32 Performance | GPU Tensor/FP16 Performance |
|---------|-------------|-----------------|------------|---------------|---------------------|---------------------------|
| Puma | 320 | 29,512 | 60 | 169.7 TB | ~942 TFLOPS | ~7.5 PFLOPS |
| Ocelote | 421 | 11,724 | 95 | 83.3 TB | ~1.01 PFLOPS | ~2.01 PFLOPS |
| El Gato | 118 | 1,888 | 0 | 23.5 TB | - | - |
| Soteria | 6 | 564 | 8 | ~3 TB | 125.6 TFLOPS | 1 PFLOPS |
| **Total** | **865** | **43,688** | **163** | **~256 TB** | **~2.08 PFLOPS** | **~10.5 PFLOPS** |

**Combined Peak GPU Performance:** Over 2 PFLOPS (2,000 TFLOPS) for standard FP32 calculations and over 10 PFLOPS for AI/deep learning workloads using Tensor Cores