package com.heartguard.dto;

import java.util.List;
import java.util.Map;

public class ModelInfoResponse {
    private String modelName;
    private String algorithm;
    private int nNeighbors;
    private String metric;
    private int p;
    private List<String> encodedColumns;
    private List<String> clinicalInputs;
    private int totalTrainingSamples;
    private Map<String, Integer> classDistribution;
    private String status;
    private String inferenceEngine;

    public String getModelName() { return modelName; }
    public void setModelName(String modelName) { this.modelName = modelName; }

    public String getAlgorithm() { return algorithm; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }

    public int getnNeighbors() { return nNeighbors; }
    public void setnNeighbors(int nNeighbors) { this.nNeighbors = nNeighbors; }

    public String getMetric() { return metric; }
    public void setMetric(String metric) { this.metric = metric; }

    public int getP() { return p; }
    public void setP(int p) { this.p = p; }

    public List<String> getEncodedColumns() { return encodedColumns; }
    public void setEncodedColumns(List<String> encodedColumns) { this.encodedColumns = encodedColumns; }

    public List<String> getClinicalInputs() { return clinicalInputs; }
    public void setClinicalInputs(List<String> clinicalInputs) { this.clinicalInputs = clinicalInputs; }

    public int getTotalTrainingSamples() { return totalTrainingSamples; }
    public void setTotalTrainingSamples(int totalTrainingSamples) { this.totalTrainingSamples = totalTrainingSamples; }

    public Map<String, Integer> getClassDistribution() { return classDistribution; }
    public void setClassDistribution(Map<String, Integer> classDistribution) { this.classDistribution = classDistribution; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getInferenceEngine() { return inferenceEngine; }
    public void setInferenceEngine(String inferenceEngine) { this.inferenceEngine = inferenceEngine; }
}
