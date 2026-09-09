# CardioGuard CDS — Clinical Decision Support System

[![Java](https://img.shields.io/badge/Java-21%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.4%2B-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)](https://scikit-learn.org/)
[![Dataset](https://img.shields.io/badge/Dataset-UCI_Heart_Disease-blue?style=for-the-badge)](https://archive.ics.uci.edu/dataset/45/heart+disease)

**CardioGuard CDS** is an open, evidence-based Clinical Decision Support system engineered for non-invasive cardiac risk stratification. It integrates a **K-Nearest Neighbors ($k=5$)** classification engine trained on a 734-patient standardized cohort from the UCI Heart Disease Dataset, deployed via a high-performance **Spring Boot 3** native Java inference microservice and accompanied by a modern **React 19** editorial clinical console.

Unlike traditional black-box models or generic AI dashboards, CardioGuard implements **deterministic mathematical parity** between scikit-learn and Java, providing instant explainability, patient-neighbor spatial retrieval, personalized risk factor attribution, and actionable clinical next steps.

---

## Key Highlights

- **Deterministic Mathematical Parity**: The Spring Boot backend replicates the exact $Z$-score normalization and Minkowski–Euclidean distance metric in memory across all 734 training points, guaranteeing **100% mathematical agreement** with scikit-learn with sub-millisecond execution and zero cross-process overhead.
- **Explainable AI (XAI)**: Retrieves and ranks the $k=5$ most physiologically similar historical clinical cases with exact distances and ground-truth outcomes for transparent clinician review.
- **Risk Stratification & Factor Isolation**: Translates continuous Euclidean distance weights into probabilistic risk percentages ($0.0\% - 100.0\%$) and dynamically flags specific pathophysiological contributors (e.g., exertional ST depression, ischemic slopes, hypertension).
- **Cohort Batch Triage Engine**: High-throughput screening endpoint capable of processing multi-patient hospital cohorts simultaneously with aggregated epidemiological statistics.
- **Strict Client-Server Integrity**: Real-time heartbeat polling (`/api/model/info` every 3s) with proactive offline gating: no local mock calculations, zero stale prediction persistence, and automatic recovery upon service reconnect.
- **Bold Editorial Visual System**: Crafted in an independent medical journal / clinical report aesthetic with a warm ivory paper palette (`#F5F0E6`), high-contrast typography, and accessible UI controls.

---

## Architecture & System Flow

```
                     ┌────────────────────────────────────────────────────────┐
                     │               Python ML Training Pipeline              │
                     │  data/heart.csv ──> train.py ──> export_model_data.py │
                     └───────────────────────────┬────────────────────────────┘
                                                 │ exports
                                                 ▼
                                        models/model_data.json
                                                 │
                                                 ▼ (embedded into classpath)
┌─────────────────────────────────────────────────────────────────────────────┐
│                   Spring Boot 3 Inference Engine (Port 8080)                 │
│                                                                             │
│  ┌───────────────────────┐   loads    ┌──────────────────────────────────┐  │
│  │  ModelLoaderService   │ ─────────> │ In-Memory Training Vector Space  │  │
│  │ (Parses 734 vectors)  │            │ (734 points x 15 scaled features)│  │
│  └───────────────────────┘            └────────────────┬─────────────────┘  │
│                                                        │                    │
│  ┌─────────────────────────────────────────────────────┴─────────────────┐  │
│  │                    HeartDiseasePredictionService                      │  │
│  │  - StandardScaler Transformation (Z-score: (x - μ) / σ)               │  │
│  │  - Top-5 Euclidean Distance Sorting: sqrt(Σ(xi - yi)²)                │  │
│  │  - Distance-Weighted Probability & Clinical Rules Engine              │  │
│  └─────────────────────────────────────┬─────────────────────────────────┘  │
│                                        │                                    │
│  ┌─────────────────────────────────────┴─────────────────────────────────┐  │
│  │                  REST Controller Endpoints (/api/...)                 │  │
│  │  POST /api/predict       POST /api/predict/batch                      │  │
│  │  GET  /api/presets       GET  /api/model/info                         │  │
│  └─────────────────────────────────────▲─────────────────────────────────┘  │
└────────────────────────────────────────┼────────────────────────────────────┘
                                         │ HTTP JSON (Vite Dev Proxy :5173)
┌────────────────────────────────────────┴────────────────────────────────────┐
│                       React 19 Frontend Console (Port 5173)                 │
│                                                                             │
│  - Patient Clinical Evaluation Intake Form (Hemodynamics, Symptoms, ECG)    │
│  - Diagnostic Review Panel with Neighbor Similarity & Clinical Actions      │
│  - Cohort Batch Screening Engine with Live Triage Metrics                   │
│  - Model Registry & Feature Inspection Console                              │
│  - Real-Time Service Health Polling (Strict Offline Gating)                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Clinical Biomarkers & Feature Space

The model processes 11 clinical biomarkers transformed into a **15-dimensional normalized feature vector**:

| # | Feature Name | Clinical Significance | Type / Value Domain | Normalization / Encoding |
|:---:|:---|:---|:---|:---|
| 1 | `Age` | Primary cardiovascular risk factor | Continuous (20 – 85 yrs) | $Z$-score standardized ($\mu, \sigma$) |
| 2 | `RestingBP` | Systemic arterial hypertension marker | Continuous (80 – 200 mmHg) | $Z$-score standardized |
| 3 | `Cholesterol` | Atherosclerotic plaque risk | Continuous (0 – 450 mg/dL) | $Z$-score standardized |
| 4 | `FastingBS` | Diabetic vascular dysfunction marker | Binary ($0 = \le 120, 1 = > 120\text{ mg/dL}$) | $Z$-score standardized |
| 5 | `MaxHR` | Chronotropic exercise response | Continuous (60 – 205 bpm) | $Z$-score standardized |
| 6 | `Oldpeak` | Exertional ST depression (myocardial ischemia) | Continuous (0.0 – 5.0 mm) | $Z$-score standardized |
| 7 | `Sex_M` | Biological sex stratification | Binary ($1 = \text{Male}, 0 = \text{Female}$) | One-Hot Encoded |
| 8 | `ChestPainType_ATA` | Atypical chest pain presentation | Binary ($0 \text{ or } 1$) | One-Hot Encoded |
| 9 | `ChestPainType_NAP` | Non-anginal chest pain | Binary ($0 \text{ or } 1$) | One-Hot Encoded |
| 10 | `ChestPainType_TA` | Classic typical angina symptoms | Binary ($0 \text{ or } 1$) | One-Hot Encoded |
| 11 | `RestingECG_Normal`| Baseline sinus rhythm | Binary ($0 \text{ or } 1$) | One-Hot Encoded |
| 12 | `RestingECG_ST` | ST-T wave abnormalities (repolarization) | Binary ($0 \text{ or } 1$) | One-Hot Encoded |
| 13 | `ExerciseAngina_Y` | Ischemic pain elicited under physical load | Binary ($1 = \text{Yes}, 0 = \text{No}$) | One-Hot Encoded |
| 14 | `ST_Slope_Flat` | Coronary artery disease indicator | Binary ($0 \text{ or } 1$) | One-Hot Encoded |
| 15 | `ST_Slope_Up` | Normal exertional repolarization | Binary ($0 \text{ or } 1$) | One-Hot Encoded |

> **Target Variable (`HeartDisease`)**:
> - `0`: Healthy / Normal ($N=333$ in cohort)
> - `1`: Elevated Risk / Heart Disease Detected ($N=401$ in cohort)

---

## Mathematical Formulation

### 1. Z-Score Standardization
Every continuous and categorical feature $x_j$ is normalized using the population mean $\mu_j$ and standard deviation $\sigma_j$ fitted during training:
$$z_j = \frac{x_j - \mu_j}{\sigma_j}$$

### 2. Minkowski–Euclidean Metric
Distance between the incoming patient vector $\mathbf{z}_{\text{patient}}$ and each historical training vector $\mathbf{z}_i$ is computed in 15-dimensional Euclidean space ($p=2$):
$$d(\mathbf{z}_{\text{patient}}, \mathbf{z}_i) = \sqrt{\sum_{j=1}^{15} \left( z_{\text{patient}, j} - z_{i, j} \right)^2}$$

### 3. Continuous Distance-Weighted Risk Scoring
The $k=5$ shortest distances are identified. The final risk percentage incorporates inverse-distance weights to capture proximity nuance:
$$w_i = \frac{1}{\max(d_i, 0.0001)}, \quad P(\text{Disease}) = \frac{\sum_{i \in \text{top } k} w_i \cdot y_i}{\sum_{i \in \text{top } k} w_i} \times 100\%$$
Where $y_i \in \{0, 1\}$ is the ground-truth diagnosis of historical neighbor $i$.

---

## Repository Structure

```
.
├── backend/                                # Spring Boot 3 Java Inference Engine
│   ├── pom.xml                             # Maven configuration (Java 21, Spring Boot 3.3.4)
│   └── src/
│       ├── main/
│       │   ├── java/com/heartguard/
│       │   │   ├── HeartGuardApplication.java   # Spring Boot entry point
│       │   │   ├── config/
│       │   │   │   └── CorsConfig.java          # Cross-origin policy & preflight mapping
│       │   │   ├── controller/
│       │   │   │   └── HeartDiseasePredictionController.java # REST endpoints
│       │   │   ├── dto/
│       │   │   │   ├── BatchPredictionRequest.java
│       │   │   │   ├── BatchPredictionResponse.java
│       │   │   │   ├── ModelInfoDto.java
│       │   │   │   ├── PatientDataDto.java
│       │   │   │   ├── PredictionResponse.java
│       │   │   │   └── PresetProfile.java
│       │   │   ├── model/
│       │   │   │   └── ModelData.java           # In-memory JSON model deserializer
│       │   │   └── service/
│       │   │       ├── HeartDiseasePredictionService.java # KNN distance & rules engine
│       │   │       └── ModelLoaderService.java  # Vector & scaler loader
│       │   └── resources/
│       │       ├── application.properties       # Server port (8080) & config
│       │       └── model_data.json              # Exported training vectors & scalers
│       └── test/java/com/heartguard/
│           └── HeartDiseasePredictionServiceTest.java
│
├── frontend/                               # React 19 Editorial Console
│   ├── package.json                        # Node scripts & dependencies (React 19, Lucide)
│   ├── vite.config.js                      # Vite dev server & /api proxy to port 8080
│   ├── index.html                          # HTML5 shell with Google Fonts preloads
│   └── src/
│       ├── App.jsx                         # Main app state & health polling loop
│       ├── index.css                       # Warm paper editorial CSS design system
│       ├── main.jsx                        # React root bootstrap
│       └── components/
│           ├── AssessmentForm.jsx          # Interactive clinical intake form
│           ├── BatchScreening.jsx          # Multi-patient cohort triage screen
│           ├── ModelInspector.jsx          # Algorithm architecture & vector browser
│           ├── Navbar.jsx                  # Header with real-time status ticker
│           ├── PresetBar.jsx               # Quick-load clinical profile pills
│           └── ResultDashboard.jsx         # Diagnostic verdict, neighbors & recommendations
│
├── models/                                 # Python ML Training & Serialization
│   ├── train.py                            # scikit-learn model training script
│   ├── export_model_data.py                # Serializes model into JSON for Java runtime
│   ├── predict.py                          # CLI inference utility for verification
│   ├── model_data.json                     # Canonical model weights & training vectors
│   ├── KNN_Heart.pkl                       # Serialized scikit-learn model
│   ├── scaler.pkl                          # Serialized StandardScaler
│   └── Columns.pkl                         # Encoded column index map
│
├── data/
│   └── heart.csv                           # UCI Heart Disease raw clinical dataset
└── Readme.md                               # Comprehensive project documentation
```

---

## API Reference

### 1. Single Patient Assessment
**`POST /api/predict`**

Scores an individual patient profile and returns classification, risk score, nearest training cases, and clinical recommendations.

#### Request Body
```json
{
  "patientId": "PT-4091",
  "patientName": "Ravi Sharma",
  "age": 52,
  "sex": "M",
  "chestPainType": "ASY",
  "restingBP": 135,
  "cholesterol": 230,
  "fastingBS": 0,
  "restingECG": "Normal",
  "maxHR": 142,
  "exerciseAngina": "N",
  "oldpeak": 1.2,
  "stSlope": "Flat"
}
```

#### Response Payload
```json
{
  "patientId": "PT-4091",
  "patientName": "Ravi Sharma",
  "prediction": 1,
  "predictionLabel": "Elevated Risk / Heart Disease Detected",
  "riskProbability": 0.598,
  "healthyProbability": 0.402,
  "riskScorePercentage": 59.8,
  "riskLevel": "HIGH",
  "confidence": "60% (3 of 5 nearest clinical cases agree)",
  "nearestNeighbors": [
    {
      "neighborRank": 1,
      "distance": 1.248,
      "label": 1,
      "labelText": "Heart Disease (Positive)"
    },
    {
      "neighborRank": 2,
      "distance": 1.275,
      "label": 0,
      "labelText": "Healthy / Normal (Negative)"
    },
    {
      "neighborRank": 3,
      "distance": 1.533,
      "label": 1,
      "labelText": "Heart Disease (Positive)"
    },
    {
      "neighborRank": 4,
      "distance": 1.548,
      "label": 1,
      "labelText": "Heart Disease (Positive)"
    },
    {
      "neighborRank": 5,
      "distance": 1.621,
      "label": 0,
      "labelText": "Healthy / Normal (Negative)"
    }
  ],
  "riskFactors": [
    "Mild ST Depression (Oldpeak = 1.2 mm)",
    "Flat ST-Segment Slope (strong correlation with coronary artery narrowing)",
    "Asymptomatic Presentation (elevated danger of silent myocardial ischemia)",
    "Hypertension Stage 1 (Resting BP = 135 mmHg)"
  ],
  "recommendations": [
    "Cardiology Consultation: Priority referral to an outpatient cardiologist for comprehensive clinical assessment.",
    "Diagnostic Stress Testing: Recommend Echocardiogram with treadmill stress testing or CT Coronary Angiography (CCTA).",
    "Biomarker Workup: Request hs-CRP (High-Sensitivity C-Reactive Protein), HbA1c, and advanced lipid fractionation.",
    "Lipid Lowering Strategy: Consider statin therapy evaluation alongside dietary reduction of saturated fats."
  ],
  "timestamp": "2026-09-09T05:32:24.596Z"
}
```

---

### 2. Cohort Batch Screening
**`POST /api/predict/batch`**

Evaluates a collection of patients in a single high-throughput pass.

#### Request Body
```json
{
  "patients": [
    {
      "patientId": "COHORT-01",
      "patientName": "Sarah Jenkins",
      "age": 48,
      "sex": "F",
      "chestPainType": "ATA",
      "restingBP": 120,
      "cholesterol": 195,
      "fastingBS": 0,
      "restingECG": "Normal",
      "maxHR": 165,
      "exerciseAngina": "N",
      "oldpeak": 0.0,
      "stSlope": "Up"
    },
    {
      "patientId": "COHORT-02",
      "patientName": "Marcus Vance",
      "age": 63,
      "sex": "M",
      "chestPainType": "ASY",
      "restingBP": 155,
      "cholesterol": 275,
      "fastingBS": 1,
      "restingECG": "ST",
      "maxHR": 110,
      "exerciseAngina": "Y",
      "oldpeak": 2.6,
      "stSlope": "Flat"
    }
  ]
}
```

#### Response Payload
```json
{
  "totalPatients": 2,
  "highRiskCount": 1,
  "lowRiskCount": 1,
  "averageRiskPercentage": 50.0,
  "results": [ ... ],
  "timestamp": "2026-09-09T05:35:28.220Z"
}
```

---

### 3. Clinical Profile Presets
**`GET /api/presets`**

Returns calibrated reference cases illustrating distinct clinical archetypes:
- **Athlete (Healthy)**: 32yo Male, resting BP 115, upsloping ST $\rightarrow$ **0.0% Risk**
- **Borderline**: 52yo Male, resting BP 138, flat ST slope $\rightarrow$ **40.0% Risk**
- **High-Risk Cardiac**: 62yo Male, severe depression, angina $\rightarrow$ **80.0% – 100.0% Risk**
- **Elderly Monitoring**: 68yo Female, LVH on ECG $\rightarrow$ **0.0% – 20.0% Risk**

---

### 4. Model Metadata & Health Check
**`GET /api/model/info`**

Supplies algorithm metadata, hyperparameters, and class distribution:
```json
{
  "modelName": "Heart Disease Risk Predictor",
  "algorithm": "KNeighborsClassifier",
  "nNeighbors": 5,
  "metric": "minkowski",
  "p": 2,
  "encodedColumns": ["Age", "RestingBP", "Cholesterol", "FastingBS", ...],
  "clinicalInputs": ["Age", "Sex", "ChestPainType", "RestingBP", ...],
  "totalTrainingSamples": 734,
  "classDistribution": { "0": 333, "1": 401 },
  "status": "OPERATIONAL",
  "inferenceEngine": "Native High-Performance Java KNN Engine (100% scikit-learn parity)"
}
```

---

## Getting Started

### Prerequisites
- **Java**: OpenJDK 17 or 21+ (`java -version`)
- **Maven**: 3.9+ (`mvn -version`)
- **Node.js**: 18+ and npm (`node -v`)
- **Python** *(Optional, only needed if re-training)*: Python 3.10+ with `scikit-learn`, `pandas`, `numpy`

---

### 1. Clone the Repository
```bash
git clone https://github.com/Harsh1730/Heart-disease-Prediction.git
cd Heart-disease-Prediction
```

---

### 2. Run the Spring Boot Backend

Open a terminal in the `backend/` directory:

```powershell
cd backend
mvn clean compile
mvn spring-boot:run
```

Alternatively, build and run the packaged JAR directly:
```powershell
mvn package -DskipTests
java -jar target/heartguard-backend-1.0.0.jar
```

The service will boot and log:
```text
INFO --- c.heartguard.service.ModelLoaderService  : Successfully loaded ML Model: KNeighborsClassifier with 5 neighbors, 734 training points and 15 feature dimensions.
INFO --- o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
```
Verify via browser or terminal: [http://localhost:8080/api/model/info](http://localhost:8080/api/model/info)

---

### 3. Run the React Console

In a separate terminal, navigate to `frontend/`:

```powershell
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

- The Vite dev server will proxy all `/api/*` calls directly to `http://localhost:8080`.
- The top status ticker will display `Inference Engine: Online (Port 8080)`.

---

### 4. (Optional) Re-training the Model

If you wish to modify hyperparameters, re-tune $k$, or re-fit standard scalers:

```powershell
cd models
python train.py
python export_model_data.py
```

This updates `models/model_data.json` and synchronizes it to `backend/src/main/resources/model_data.json`. Rebuild the backend to apply changes.

---

## Client-Side Safety & Offline Gating

To prevent confusion and false confidence, the frontend enforces strict offline boundaries:

```
[Backend Status: OFFLINE]
   │
   ├──> Form Submit Button: Disabled with label "⊘ Backend Offline — Service Required"
   ├──> Diagnostic Panel: Replaced with "Inference Engine Offline" card + startup commands
   ├──> Active Results: Instantly cleared (setResult(null)) to prevent stale reading
   ├──> Batch Screening: Action disabled with clear connection alert
   └──> Background Polling: Checks /api/model/info every 3 seconds for seamless auto-reconnect
```

---

## Clinical Disclaimer

> [!IMPORTANT]
> **For Clinical Evaluation & Research Use Only.**
> CardioGuard CDS is an analytical decision-support prototype designed for healthcare education, machine learning research, and observational risk stratification. It is **not** a certified medical diagnostic device and must not be used as the sole basis for clinical intervention, pharmacotherapy, or acute patient management. Always corroborate findings with licensed healthcare professionals, 12-lead electrocardiography, laboratory enzyme panels, and coronary imaging.

---

## Authors & License

- Developed by **Harsh** ([GitHub: @Harsh1730](https://github.com/Harsh1730))
- Open-source under the [MIT License](LICENSE).