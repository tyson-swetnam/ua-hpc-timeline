# University of Arizona Peer Institutions - HPC Resources

## Peer Institution Selection Criteria

The University of Arizona (R1, AAU member, established 1985) has been compared with three peer institutions:
1. **University of Colorado Boulder** - AAU member (1966), R1, similar western public research university
2. **University of Utah** - R1, strong regional peer with extensive HPC resources
3. **Texas A&M University** - AAU member (2001), R1, large land-grant research university

---

## 1. University of Colorado Boulder (CU Boulder)

### Primary HPC System: Alpine

**Launched:** 2021-2022  
**Architecture:** Heterogeneous  
**Location:** Boulder, CO  
**Funding:** CU Boulder + CU Anschutz + Colorado State University + NSF (#2201538, #2322260)

### System Overview

| Metric | Value |
|--------|-------|
| **Total Nodes** | 455+ |
| **Total CPU Cores** | ~28,080 |
| **Total GPUs** | ~225+ |
| **System Memory** | ~15+ TB |
| **Interconnect** | HDR InfiniBand (200 Gb/s), 25 Gb Ethernet |
| **Storage** | PetaLibrary for long-term storage |

### Detailed Node Specifications

| Node Type | Number of Nodes | CPUs/Node | CPU Model | RAM/Node | GPUs/Node | GPU Model | Total GPUs |
|-----------|-----------------|-----------|-----------|----------|-----------|-----------|------------|
| **Standard (Milan)** | ~360 | 64 | AMD EPYC 7763 (Milan) | 256 GB | - | - | - |
| **Milan 128-core** | ~50 | 128 | AMD EPYC 7713 (Milan) | 512 GB | - | - | - |
| **A100 GPU** | ~50 | 64 | AMD EPYC Milan | 512 GB | 2-4 | NVIDIA A100 40GB | ~150 |
| **MI100 GPU** | ~8 | 64 | AMD EPYC Milan | 512 GB | 4 | AMD MI100 | ~32 |
| **A40 GPU** | ~12 | 64 | AMD EPYC Milan | 512 GB | 2-4 | NVIDIA A40 | ~40 |
| **High Memory** | ~10 | 48-128 | AMD EPYC Milan | 1-2 TB | - | - | - |

### GPU Performance Summary

| GPU Type | Count | FP32/GPU | FP64/GPU | Tensor/GPU | Total FP32 | Total Tensor |
|----------|-------|----------|----------|------------|------------|--------------|
| **NVIDIA A100 40GB** | ~150 | 19.5 TFLOPS | 9.7 TFLOPS | 312 TFLOPS | 2,925 TFLOPS | 46.8 PFLOPS |
| **AMD MI100** | ~32 | 23.1 TFLOPS | 11.5 TFLOPS | 184.6 TFLOPS | 739 TFLOPS | 5.9 PFLOPS |
| **NVIDIA A40** | ~40 | 37.4 TFLOPS | 0.58 TFLOPS | 150 TFLOPS | 1,496 TFLOPS | 6 PFLOPS |
| **Total** | **~222** | - | - | - | **~5.2 PFLOPS** | **~58.7 PFLOPS** |

### Key Features
- **Replaces:** RMACC Summit (2017-2022)
- **Open OnDemand:** Web-based interface for easy access
- **Modular Design:** Designed to evolve with researcher needs
- **Regional Collaboration:** Serves CU Boulder, CU Anschutz, and Colorado State University
- **NSF Support:** Partially funded by NSF for broader research community access

### Partitions
- `amilan`: Standard Milan CPU nodes (64 cores)
- `amilan128c`: High-core Milan nodes (128 cores)
- `aa100`: A100 GPU nodes
- `ami100`: MI100 GPU nodes (AMD GPUs)
- `al40`: A40 GPU nodes
- `amem`: High memory nodes (1-2 TB)
- `acompile`: Compile/test nodes
- `atesting`: Testing partition for workflow validation

---

## 2. University of Utah

### Center for High Performance Computing (CHPC)

**Established:** Long-standing HPC center  
**Architecture:** Multiple heterogeneous clusters  
**Location:** Downtown Data Center, Salt Lake City, UT  
**Service Area:** University of Utah + Utah State + Utah Valley + Weber State + Snow College + Utah Tech

### System Overview

| Metric | Value |
|--------|-------|
| **Total Nodes** | ~450+ |
| **Total CPU Cores** | ~45,000+ |
| **Total GPUs** | ~280+ |
| **System Memory** | ~40+ TB |
| **Total Storage** | 28+ PB RAID |
| **Research Groups Supported** | 650+ |
| **Academic Departments** | 45 of 81 at UofU |

### Primary HPC Clusters

#### Notchpeak (Primary Production Cluster)
| Specification | Value |
|---------------|-------|
| **Total Nodes** | ~200+ |
| **CPU Cores** | ~15,000+ |
| **GPUs** | ~150+ (A100, V100, P100, MI250X) |
| **Processor Types** | AMD EPYC Rome 7702P (64 cores), Intel Cascade Lake |
| **Memory/Node** | 256 GB - 512 GB (standard), up to 2 TB (high memory) |
| **Interconnect** | HDR InfiniBand |

#### Kingspeak
| Specification | Value |
|---------------|-------|
| **Total Nodes** | ~100+ |
| **CPU Cores** | ~6,000+ |
| **GPUs** | ~50+ (V100, P100) |
| **Processor** | Intel Skylake Xeon Gold |
| **Memory/Node** | 187-384 GB |

#### Lonepeak
| Specification | Value |
|---------------|-------|
| **Total Nodes** | ~220+ |
| **CPU Cores** | ~13,000+ |
| **GPUs** | ~40+ (V100, K80) |
| **Processor** | Intel Broadwell/Haswell |
| **Memory/Node** | 128-256 GB |

#### Granite (Allocation-Based)
| Specification | Value |
|---------------|-------|
| **Total Nodes** | ~30+ |
| **CPU Cores** | ~4,000+ |
| **GPUs** | ~40+ (A100, MI250X, V100) |
| **Processor** | AMD EPYC, Intel Cascade Lake |
| **Features** | Cutting-edge GPU nodes, node sharing enabled |

### Utah GPU Resources Summary

| GPU Type | Estimated Count | FP32/GPU | Total FP32 | Tensor/GPU | Total Tensor | Clusters |
|----------|-----------------|----------|------------|------------|--------------|----------|
| **NVIDIA A100 40/80GB** | ~60 | 19.5 TFLOPS | 1,170 TFLOPS | 312 TFLOPS | 18.7 PFLOPS | Notchpeak, Granite |
| **AMD MI250X** | ~20 | 47.9 TFLOPS | 958 TFLOPS | - | - | Granite, Notchpeak |
| **NVIDIA V100 32GB** | ~100 | 15.7 TFLOPS | 1,570 TFLOPS | 125 TFLOPS | 12.5 PFLOPS | Multiple |
| **NVIDIA P100 16GB** | ~60 | 10.6 TFLOPS | 636 TFLOPS | 21.2 TFLOPS (FP16) | 1.3 PFLOPS | Kingspeak, Lonepeak |
| **NVIDIA K80** | ~40 | 8.73 TFLOPS | 349 TFLOPS | - | - | Lonepeak |
| **Total** | **~280** | - | **~4.7 PFLOPS** | - | **~32.5 PFLOPS** |

### Key Features
- **Peak CPU Performance:** 224 TFLOPS measured
- **Owner/General Model:** Researchers can purchase nodes while sharing with community
- **Freecycle/Guest Access:** Unused cycles available to all users (preemptable)
- **Protected Environment:** Redwood cluster for HIPAA/sensitive data
- **Allocation System:** Quarterly allocation proposals for Notchpeak and Granite
- **Multi-Institution:** Serves 6 Utah higher education institutions
- **Long Job Support:** Up to 72 hours standard, longer with special approval

### Storage Infrastructure
- **Scratch:** Lustre-based high-performance scratch (ZFS-based project storage)
- **Group Spaces:** Purchasable TB shares for research groups
- **Home Directories:** NFS-mounted, visible across all clusters

---

## 3. Texas A&M University

### High Performance Research Computing (HPRC)

**Established:** 1989 (formerly Supercomputing Facility)  
**Rebranded:** 2016 as interdisciplinary research center  
**Users:** 2,500+ users, 450+ faculty  
**Location:** West Campus Data Center (WCDC), College Station, TX

### System Overview

| Metric | Value |
|--------|-------|
| **Total Peak Performance** | 12.5 PFLOPS |
| **Total CPU Cores** | ~55,000+ |
| **Total GPUs** | ~320+ |
| **Total Storage** | 24.7 PB high-performance |
| **Active Clusters** | 5 (ACES, Launch, FASTER, Grace, ViDaL) |

### Primary Clusters

#### Grace (Flagship System)
**Deployed:** 2021  
**Vendor:** Dell  
**Peak Performance:** 6+ PFLOPS

| Specification | Details |
|---------------|---------|
| **Total Nodes** | 940 |
| **Total CPU Cores** | 45,376 |
| **Standard Compute Nodes** | 800 nodes, 48 cores each, 384 GB RAM |
| **GPU Nodes - A100** | 100 nodes, 2× A100 40GB per node |
| **GPU Nodes - RTX 6000** | 9 nodes, 2× RTX 6000 24GB per node |
| **GPU Nodes - T4** | 8 nodes, 4× T4 16GB per node |
| **GPU Nodes - A40** | 15 nodes, 2× A40 48GB per node |
| **High Memory Nodes** | 8 nodes, 80 cores, 3 TB RAM |
| **Login Nodes** | 5 |
| **Processor** | Intel Xeon Gold 6248R (Cascade Lake), 3.0 GHz, 24 cores |
| **Interconnect** | HDR InfiniBand (100 Gb/s), two-level fat-tree |
| **Storage** | 5 PB Lustre + 3.3 PB GPFS |

**Grace GPU Summary:**
- 200× A100 40GB
- 18× RTX 6000 24GB  
- 32× T4 16GB
- 30× A40 48GB
- **Total:** 280 GPUs

#### Terra
**Deployed:** ~2017  
**Status:** Retiring soon

| Specification | Details |
|---------------|---------|
| **Total Nodes** | 320 |
| **Total CPU Cores** | 9,632 |
| **Processor** | Intel Broadwell, 28 cores/node |
| **Standard Memory** | 64 GB/node |
| **GPU Nodes - K80** | 48 nodes with K80 GPUs |
| **KNL Nodes** | 16 Knights Landing nodes |

#### ACES (Accelerator Testbed)
**Focus:** Cutting-edge accelerators and experimental hardware

| Specification | Details |
|---------------|---------|
| **Accelerators** | Intel Max GPUs, Intel FPGAs, NVIDIA H100, NVIDIA A30, NEC Vector Engines, NextSilicon co-processors, Graphcore IPUs |
| **Interconnect** | NVIDIA NDR200 (200 Gb/s) |
| **Storage** | Lustre-based |

#### Launch
**Focus:** AMD EPYC Genoa with A30 GPUs

| Specification | Details |
|---------------|---------|
| **Processor** | AMD EPYC 9654 (Genoa), 96 cores |
| **GPUs** | NVIDIA A30 |
| **Interconnect** | HDR100 InfiniBand |

#### ViDaL (Secure/Compliant)
**Focus:** HIPAA, Texas HB 300, NDA-compliant research

| Specification | Details |
|---------------|---------|
| **Nodes** | 18 |
| **Processor** | AMD EPYC Genoa |
| **Standard Nodes** | 16 nodes, 192 GB RAM |
| **Large Memory** | 4 nodes, 1.5 TB RAM |
| **GPU Nodes** | 4 nodes, 2× V100 each |
| **OS Support** | Windows and Linux |
| **Interconnect** | 100 Gb Ethernet |

#### FASTER (Composable System)
**Purpose:** High-performance data analysis

| Specification | Details |
|---------------|---------|
| **Focus** | Fostering Accelerated Scientific Transformations, Education, and Research |
| **Architecture** | Composable infrastructure |

### Texas A&M GPU Computing Power

| GPU Type | Count (Grace) | FP32/GPU | FP64/GPU | Tensor/GPU | Total FP32 | Total Tensor |
|----------|---------------|----------|----------|------------|------------|--------------|
| **NVIDIA A100 40GB** | 200 | 19.5 TFLOPS | 9.7 TFLOPS | 312 TFLOPS | 3,900 TFLOPS | 62.4 PFLOPS |
| **NVIDIA A40 48GB** | 30 | 37.4 TFLOPS | 0.58 TFLOPS | 150 TFLOPS | 1,122 TFLOPS | 4.5 PFLOPS |
| **NVIDIA RTX 6000** | 18 | 16.3 TFLOPS | 0.51 TFLOPS | 130 TFLOPS | 293 TFLOPS | 2.3 PFLOPS |
| **NVIDIA T4** | 32 | 8.1 TFLOPS | 0.25 TFLOPS | 65 TFLOPS | 259 TFLOPS | 2.1 PFLOPS |
| **NVIDIA V100** | ~20 (ViDaL+Terra) | 15.7 TFLOPS | 7.8 TFLOPS | 125 TFLOPS | 314 TFLOPS | 2.5 PFLOPS |
| **NVIDIA K80** | ~96 (Terra) | 8.73 TFLOPS | 2.91 TFLOPS | - | 838 TFLOPS | - |
| **NVIDIA H100** | TBD (ACES) | 67 TFLOPS | 34 TFLOPS | 2,000 TFLOPS | Variable | Variable |
| **Total (Grace+Legacy)** | **~396** | - | - | - | **~6.7 PFLOPS** | **~73.8 PFLOPS** |

### Key Features
- **Summer Computing Academy:** Promotes computing among high school students
- **Regular Training:** Broad range of workshops and courses
- **Multi-Institution Access:** Via Lonestar6 at TACC (joint UT System + TAMU + UNT + TTU funding)
- **Diverse Accelerators:** ACES testbed with cutting-edge hardware (Intel Max, Graphcore IPUs, NEC Vector Engines)
- **Secure Computing:** ViDaL for HIPAA/proprietary data
- **Long-Standing Expertise:** 35+ years of HPC service (since 1989)

---

## Peer Institution Comparison Summary

| University | Primary System | Total Cores | Total GPUs | GPU FP32 (PFLOPS) | GPU AI/Tensor (PFLOPS) | Deployment Year |
|------------|----------------|-------------|------------|-------------------|------------------------|-----------------|
| **CU Boulder** | Alpine | ~28,080 | ~222 | ~5.2 | ~58.7 | 2021 |
| **Utah** | Multiple (Notchpeak lead) | ~45,000 | ~280 | ~4.7 | ~32.5 | Ongoing |
| **Texas A&M** | Grace | ~45,376 (Grace), 55,000+ total | ~396 | ~6.7 | ~73.8 | 2021 |
| **Arizona** | Puma | ~43,688 | 163 | ~2.08 | ~10.5 | 2020 |

### Key Observations

#### CPU Resources
1. **Utah leads** in total CPU cores (~45,000) due to multiple active clusters
2. **Texas A&M** has similar scale (~55,000 total across all clusters)
3. **Arizona** is competitive with 43,688 cores
4. **CU Boulder** is more focused with 28,080 cores but modern architecture

#### GPU Resources
1. **Texas A&M dominates** with 396 GPUs and 73.8 PFLOPS AI performance
2. **Utah** has 280 GPUs with strong diversity (A100, MI250X, V100)
3. **CU Boulder** has 222 GPUs with 58.7 PFLOPS AI performance
4. **Arizona** has 163 GPUs with 10.5 PFLOPS AI performance - **significantly behind peers**

#### Strategic Positioning
- **Texas A&M:** Largest scale, aggressive GPU investment, diverse accelerator testbed (ACES)
- **Utah:** Mature multi-cluster approach, strong owner/community model, longest-running programs
- **CU Boulder:** Newest infrastructure (Alpine), AMD-centric with strong NSF support
- **Arizona:** Competitive CPU resources, **major GPU deficit** compared to peers

### Performance Gaps

| Metric | UA Value | Peer Average | UA vs. Peer Gap |
|--------|----------|--------------|-----------------|
| **Total GPUs** | 163 | ~299 | **46% below average** |
| **GPU FP32 Performance** | 2.08 PFLOPS | 5.5 PFLOPS | **62% below average** |
| **GPU AI Performance** | 10.5 PFLOPS | 55 PFLOPS | **81% below average** |
| **Total CPU Cores** | 43,688 | 39,485 | **11% above average** ✓ |

---

## Resource Documentation URLs

### University of Colorado Boulder
1. **Alpine Hardware Documentation**
   - https://curc.readthedocs.io/en/latest/clusters/alpine/alpine-hardware.html
   - https://curc.readthedocs.io/en/latest/clusters/alpine/index.html

2. **Research Computing Homepage**
   - https://www.colorado.edu/rc/alpine

3. **Alpine Quick Start**
   - https://curc.readthedocs.io/en/latest/clusters/alpine/quick-start.html

### University of Utah
1. **CHPC Homepage**
   - https://www.chpc.utah.edu/

2. **HPC Clusters Overview**
   - https://www.chpc.utah.edu/resources/HPC_Clusters.php

3. **GPU and Accelerator Resources**
   - https://www.chpc.utah.edu/documentation/guides/gpus-accelerators.php

4. **Notchpeak User Guide**
   - https://www.chpc.utah.edu/documentation/guides/notchpeak.php

5. **About CHPC**
   - https://www.chpc.utah.edu/about/index.php

### Texas A&M University
1. **HPRC Homepage**
   - https://hprc.tamu.edu/

2. **Resources Overview**
   - https://hprc.tamu.edu/resources/

3. **Grace Hardware Details**
   - https://hprc.tamu.edu/kb/User-Guides/Grace/Hardware/

4. **HPRC Systems Overview**
   - https://hprc.tamu.edu/wiki/HPRC:Systems

5. **Division of Research HPRC Page**
   - https://research.tamu.edu/facility/high-performance-research-computing/

---

## Conclusions and Recommendations

### Peer Institution Strengths

**CU Boulder (Alpine):**
- Modern, unified AMD-based architecture
- Strong NSF funding partnership
- Excellent GPU/CPU ratio for AI workloads
- Regional collaboration model (CU system + CSU)

**University of Utah:**
- Most mature and diversified HPC portfolio
- Excellent owner/community hybrid model
- Strong multi-institutional reach (6 universities)
- Largest total CPU core count
- Good GPU diversity (NVIDIA + AMD)

**Texas A&M:**
- Largest GPU deployment among peers
- Most aggressive AI/accelerator investment
- Excellent experimental hardware testbed (ACES)
- Strong secure computing offering (ViDaL)
- Longest institutional commitment (35+ years)

### University of Arizona Position

**Strengths:**
- Competitive CPU resources (43,688 cores - above peer average)
- Recent Puma deployment (2020) with modern AMD EPYC
- Good CPU core density (94 cores/node on Puma)
- Tri-cluster diversity (Puma, Ocelote, El Gato)

**Critical Gaps:**
- **GPU deficit:** 163 GPUs vs. peer average of 299 (46% below)
- **AI performance gap:** 10.5 PFLOPS vs. peer average 55 PFLOPS (81% below)
- **Aging GPU fleet:** Heavy reliance on P100 (2016) and V100 (2017)
- **Limited cutting-edge hardware:** No H100, limited A100 deployment

### Strategic Recommendations for UA

To achieve parity with peer institutions, the University of Arizona should:

1. **Immediate Priority: GPU Expansion**
   - Add 130-170 modern GPUs to reach peer-average levels
   - Target: NVIDIA H100 or H200 for maximum AI capability
   - Alternative: AMD MI300X for competitive performance

2. **Performance Target**
   - Goal: 50+ PFLOPS AI performance (vs. current 10.5)
   - Requires: ~100-150 H100 GPUs or 200+ A100 GPUs

3. **Infrastructure Investment**
   - Expand Puma cluster with GPU-heavy nodes
   - Consider dedicated AI/ML cluster similar to TAMU's ACES
   - Upgrade network to support GPU-dense configurations

4. **Maintain CPU Leadership**
   - UA's CPU resources are competitive; maintain investment
   - Focus future CPU purchases on high-core-count nodes (128+ cores)

5. **Regional Collaboration**
   - Expand AFORCE partnership benefits
   - Consider joint procurement with ASU/NAU for better pricing
   - Leverage ASU's Sol infrastructure for some workloads

**Estimated Investment:** To achieve peer parity in GPU resources would require approximately $15-25M investment in hardware (150 H100 GPUs @ $30-40K each + infrastructure).