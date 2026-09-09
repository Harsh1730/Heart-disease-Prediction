package com.heartguard.dto;

import java.util.List;

public class BatchPredictionResponse {
    private int totalPatients;
    private int highRiskCount;
    private int lowRiskCount;
    private double averageRiskPercentage;
    private List<PredictionResponse> results;

    public BatchPredictionResponse() {}

    public BatchPredictionResponse(int totalPatients, int highRiskCount, int lowRiskCount, double averageRiskPercentage, List<PredictionResponse> results) {
        this.totalPatients = totalPatients;
        this.highRiskCount = highRiskCount;
        this.lowRiskCount = lowRiskCount;
        this.averageRiskPercentage = averageRiskPercentage;
        this.results = results;
    }

    public int getTotalPatients() { return totalPatients; }
    public void setTotalPatients(int totalPatients) { this.totalPatients = totalPatients; }

    public int getHighRiskCount() { return highRiskCount; }
    public void setHighRiskCount(int highRiskCount) { this.highRiskCount = highRiskCount; }

    public int getLowRiskCount() { return lowRiskCount; }
    public void setLowRiskCount(int lowRiskCount) { this.lowRiskCount = lowRiskCount; }

    public double getAverageRiskPercentage() { return averageRiskPercentage; }
    public void setAverageRiskPercentage(double averageRiskPercentage) { this.averageRiskPercentage = averageRiskPercentage; }

    public List<PredictionResponse> getResults() { return results; }
    public void setResults(List<PredictionResponse> results) { this.results = results; }
}
