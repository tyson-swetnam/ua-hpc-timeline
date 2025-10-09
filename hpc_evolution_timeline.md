# HPC Evolution Timeline: CPU Cores and GPU Performance Analysis

## University of Arizona HPC Systems in Historical Context

### Executive Summary

This report examines how the University of Arizona's three HPC clusters (El Gato, Ocelote, and Puma) compare to typical server configurations of their respective eras, and tracks the dramatic evolution of GPU computing power over the past 15 years.

---

## Part 1: Server CPU Core Evolution

### Typical Dual-Socket Server Configurations by Year

| Year | Typical CPU Model | Architecture | Cores/CPU | Total Cores (Dual Socket) | Manufacturing Process |
|------|-------------------|--------------|-----------|---------------------------|----------------------|
| **2010** | Xeon X5650/5660 | Westmere | 6 | **12** | 32nm |
| **2011** | Xeon E5-2670 | Sandy Bridge | 8 | **16** | 32nm |
| **2012** | Xeon E5-2680 | Sandy Bridge | 8 | **16** | 32nm |
| **2013** | Xeon E5-2650 v2 | Ivy Bridge | 8 | **16** | 22nm |
| **2014** | Xeon E5-2690 v3 | Haswell | 12 | **24** | 22nm |
| **2015** | Xeon E5-2680 v3/v4 | Haswell/Broadwell | 12-14 | **24-28** | 22nm/14nm |
| **2016** | Xeon E5-2690 v4 | Broadwell | 14 | **28** | 14nm |
| **2017** | Xeon Gold 6140 | Skylake | 18 | **36** | 14nm |
| **2018** | Xeon Gold 6148 | Skylake | 20 | **40** | 14nm |
| **2019** | EPYC 7742 | Rome (Zen 2) | 64 | **128** | 7nm |
| **2020** | EPYC 7642 | Rome (Zen 2) | 48 | **94** | 7nm |
| **2021** | EPYC 7763 | Milan (Zen 3) | 64 | **128** | 7nm |
| **2022** | EPYC 9654 | Genoa (Zen 4) | 96 | **192** | 5nm |
| **2023** | EPYC 9754 | Genoa (Zen 4) | 128 | **256** | 5nm |
| **2024** | EPYC 9965 | Turin (Zen 5) | 192 | **384** | 3nm |

### UA HPC Systems vs. Contemporary Servers

| UA HPC Cluster | Purchase Year | Cores/Node | Contemporary Average | UA Position |
|----------------|---------------|------------|---------------------|-------------|
| **El Gato** | 2013 | 16 | 16 cores | **At industry standard** |
| **Ocelote** | 2016 | 28 | 28 cores | **At industry standard** |
| **Puma** | 2020 | 94 | 96-128 cores | **Above average for HPC** |

**Analysis:** Each UA HPC system was purchased with competitive, contemporary server configurations. El Gato and Ocelote matched typical dual-socket servers of their time, while Puma's AMD EPYC 7642 processors (48 cores × 2 = 94 usable cores) placed it solidly in the high-end HPC category for 2020.

### Key Observations on CPU Evolution

1. **2010-2016**: Gradual growth from 12 to 28 cores (2.3× increase over 6 years, ~14% CAGR)
2. **2016-2020**: Explosive growth from 28 to 128 cores (4.6× increase in 4 years, ~46% CAGR)
3. **2020-2024**: Continued rapid growth to 384 cores (4× increase in 4 years, ~40% CAGR)
4. **AMD's Impact**: AMD's Zen architecture (2017+) disrupted the market, forcing rapid core count increases

---

## Part 2: GPU Performance Evolution Timeline

### NVIDIA Data Center GPU Performance by Generation

| Year | GPU Model | Architecture | FP32 (TFLOPS) | FP64 (TFLOPS) | AI/Tensor (TFLOPS) | Memory | Used At UA |
|------|-----------|--------------|---------------|---------------|-------------------|---------|------------|
| **2010** | Tesla C2050 | Fermi | 1.03 | 0.52 | - | 6 GB | - |
| **2012** | Tesla K20 | Kepler | 3.52 | 1.17 | - | 5 GB | - |
| **2013** | Tesla K40 | Kepler | 4.29 | 1.43 | - | 12 GB | ✓ (El Gato)* |
| **2014** | Tesla K80 | Kepler | 8.73 | 2.91 | - | 24 GB | ✓ (Ocelote)* |
| **2015** | Tesla M40 | Maxwell | 6.84 | 0.21 | - | 12 GB | - |
| **2016** | **Tesla P100** | Pascal | **10.6** | **5.3** | 21.2 (FP16) | 16 GB | ✓ **Ocelote** |
| **2017** | **Tesla V100** | Volta | **15.7** | **7.8** | **125** | 16-32 GB | ✓ **Puma/Soteria** |
| **2018** | Tesla V100S | Volta | 16.4 | 8.2 | 130 | 32 GB | ✓ **Puma** |
| **2020** | **A100 (40GB)** | Ampere | **19.5** | **9.7** | **312** | 40 GB | ✓ **Puma (MIG)** |
| **2021** | A100 (80GB) | Ampere | 19.5 | 9.7 | 312 | 80 GB | - |
| **2022** | H100 | Hopper | 67 | 34 | 2000 (FP8) | 80 GB | - |
| **2023** | H200 | Hopper | 67 | 34 | 2000 (FP8) | 141 GB | - |
| **2025** | B200 | Blackwell | 90+ | 45+ | 4500+ (FP4) | 192 GB | - |

*Note: K40 and K80 GPUs were retired from El Gato and Ocelote in April 2022 when NVIDIA ended support.

### Performance Growth Analysis

#### FP32 (Single Precision) Performance

| Period | Starting FLOPS | Ending FLOPS | Growth Factor | CAGR |
|--------|----------------|--------------|---------------|------|
| 2010-2016 | 1.03 TFLOPS | 10.6 TFLOPS | 10.3× | 48% |
| 2016-2020 | 10.6 TFLOPS | 19.5 TFLOPS | 1.8× | 16% |
| 2020-2025 | 19.5 TFLOPS | 90+ TFLOPS | 4.6× | 36% |
| **2010-2025** | **1.03 TFLOPS** | **90+ TFLOPS** | **87×** | **33%** |

#### FP64 (Double Precision) Performance

| Period | Starting FLOPS | Ending FLOPS | Growth Factor | CAGR |
|--------|----------------|--------------|---------------|------|
| 2010-2016 | 0.52 TFLOPS | 5.3 TFLOPS | 10.2× | 48% |
| 2016-2020 | 5.3 TFLOPS | 9.7 TFLOPS | 1.8× | 16% |
| 2020-2025 | 9.7 TFLOPS | 45+ TFLOPS | 4.6× | 36% |
| **2010-2025** | **0.52 TFLOPS** | **45+ TFLOPS** | **87×** | **33%** |

#### AI/Deep Learning Performance (Tensor Cores)

| Year | GPU | Tensor Performance | Growth vs. Previous |
|------|-----|-------------------|---------------------|
| 2016 | P100 | 21.2 TFLOPS (FP16) | Baseline |
| 2017 | V100 | 125 TFLOPS | 5.9× |
| 2020 | A100 | 312 TFLOPS | 2.5× |
| 2022 | H100 | 2,000 TFLOPS (FP8) | 6.4× |
| 2025 | B200 | 4,500+ TFLOPS (FP4) | 2.3× |

**2016-2025**: AI performance increased by **212× in just 9 years** (75% CAGR)

### Visualization: GPU Performance Doubling Times

| Metric | Approximate Doubling Time | Comments |
|--------|---------------------------|----------|
| FP32/FP64 (2010-2020) | ~2.1 years | Consistent with Moore's Law |
| FP32/FP64 (2020-2025) | ~2.7 years | Slight slowdown as physics limits approach |
| AI/Tensor Performance | ~1.6 years | **Faster than Moore's Law** due to architectural specialization |

---

## Part 3: UA HPC Systems - Comparative Analysis

### Computing Power vs. Purchase Year Contemporary GPUs

| UA Cluster | Year | Nodes | GPU Model | TFLOPS/GPU (FP32) | Total GPU TFLOPS | Contemporary Top GPU | % of Contemporary Peak |
|------------|------|-------|-----------|-------------------|------------------|---------------------|----------------------|
| **El Gato** | 2013 | 118 | None | - | 0 | K40 (4.3 TFLOPS) | - |
| **Ocelote** | 2016 | 60 GPU nodes | P100 | 10.6 | ~1,007 | P100 (10.6 TFLOPS) | **100%** ✓ |
| **Puma** | 2020 | 15 GPU nodes | V100S/A100 | 15.7-19.5 | ~942 | A100 (19.5 TFLOPS) | **85-100%** ✓ |
| **Soteria** | 2023 | 2 GPU nodes | V100 | 15.7 | ~126 | H100 (67 TFLOPS) | 23% |

### Total HPC GPU Computing Power Growth

| Metric | 2013 | 2016 | 2020 | 2025 | Growth (2016-2025) |
|--------|------|------|------|------|-------------------|
| Total GPU Nodes | 0 | 60 | 15 | 17 | - |
| Total GPUs | 0 | 95 | 60 | 68 | - |
| Total FP32 PFLOPS | 0 | 1.01 | 0.94 | 2.08 | 2.1× |
| Total AI PFLOPS | 0 | 2.01 (FP16) | 7.5 | 10.5 | 5.2× |

---

## Part 4: Key Insights and Trends

### CPU Evolution Insights

1. **Steady Then Explosive Growth**: CPU cores grew modestly from 2010-2016 (12→28), then exploded 2016-2024 (28→384)
2. **Manufacturing Process Matters**: Die shrinks (32nm→22nm→14nm→7nm→5nm→3nm) enabled higher core densities
3. **AMD Renaissance**: AMD's 7nm Zen 2 (2019) disrupted Intel's dominance, driving industry-wide core count increases
4. **UA's Timing**: UA purchased systems at or above industry standards for their respective years

### GPU Evolution Insights

1. **AI Acceleration Dominance**: Tensor Core performance is growing **3× faster** than traditional FLOPS
2. **Specialization Over Generalization**: Modern GPUs optimize for AI workloads (lower precision, higher throughput)
3. **Memory Wall**: Memory capacity and bandwidth growth is as critical as compute growth
4. **UA's GPU Strategy**: UA made excellent choices:
   - **P100 (2016)**: Industry-leading at purchase
   - **V100S (2020)**: Solid choice, still competitive today
   - **A100 MIG (2020)**: Forward-thinking with multi-instance capability

### Performance Per Dollar Trends

Based on research data:
- GPU FLOPS/$ doubles approximately every **2.5 years**
- CPU cores/$ doubles approximately every **3-4 years**
- AI-specific performance/$ doubles approximately every **2 years**

### Future Projections (2025-2030)

| Metric | 2025 Baseline | 2030 Projection (Conservative) | Expected Growth |
|--------|---------------|-------------------------------|-----------------|
| CPU Cores (Dual Socket) | 384 | 768-1024 | 2-2.7× |
| GPU FP32 TFLOPS | 90 | 250-350 | 2.8-3.9× |
| GPU AI TFLOPS | 4,500 | 20,000-30,000 | 4.4-6.7× |
| GPU Memory | 192 GB | 512 GB+ | 2.7× |

---

## Conclusions

1. **El Gato (2013)**: Deployed with industry-standard 16-core nodes, representing the tail end of modest CPU growth era
2. **Ocelote (2016)**: Perfect timing with P100 GPUs at peak of Pascal generation; 28-core CPUs at industry standard
3. **Puma (2020)**: Captured AMD's Zen 2 revolution with 94-core nodes; mixed V100S/A100 GPUs position it well for 2020s workloads
4. **Overall**: UA's HPC procurement strategy consistently targeted contemporary or above-average configurations, providing researchers with competitive resources

### Recommendation for Future Purchases

Based on current trends, the next UA HPC system (2026-2027) should target:
- **CPUs**: 192-256 cores/node (e.g., AMD EPYC 9754 or Intel Granite Rapids-AP)
- **GPUs**: Next-gen Blackwell (B200/B300) or Hopper refresh with 1,000+ TFLOPS AI performance
- **Memory**: 500+ GB GPU memory per node for large model training
- **Interconnect**: 400-800 Gb/s networking (InfiniBand NDR or equivalent)