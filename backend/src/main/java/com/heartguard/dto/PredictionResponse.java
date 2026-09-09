package com.heartguard.dto;

import java.time.Instant;
import java.util.List;

public class PredictionResponse {
    private String patientId;
    private String patientName;
    private int prediction; // 0 or 1
    private String predictionLabel;
    private double riskProbability;
    private double healthyProbability;
    private double riskScorePercentage;
    private String riskLevel; // LOW, MODERATE, HIGH, CRITICAL
    private String confidence;
    private List<NeighborInfo> nearestNeighbors;
    private List<String> riskFactors;
    private List<String> recommendations;
    private String timestamp = Instant.now().toString();

    public static class NeighborInfo {
        private int neighborRank;
        private double distance;
        private int label;
        private String labelText;

        public NeighborInfo() {}

        public NeighborInfo(int neighborRank, double distance, int label, String labelText) {
            this.neighborRank = neighborRank;
            this.distance = distance;
            this.label = label;
            this.labelText = labelText;
        }

        public int getNeighborRank() { return neighborRank; }
        public void setNeighborRank(int neighborRank) { this.neighborRank = neighborRank; }

        public double getDistance() { return distance; }
        public void setDistance(double distance) { this.distance = distance; }

        public int getLabel() { return label; }
        public void setLabel(int label) { this.label = label; }

        public String getLabelText() { return labelText; }
        public void setLabelText(String labelText) { this.labelText = labelText; }
    }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public int getPrediction() { return prediction; }
    public void setPrediction(int prediction) { this.prediction = prediction; }

    public String getPredictionLabel() { return predictionLabel; }
    public void setPredictionLabel(String predictionLabel) { this.predictionLabel = predictionLabel; }

    public double getRiskProbability() { return riskProbability; }
    public void setRiskProbability(double riskProbability) { this.riskProbability = riskProbability; }

    public double getHealthyProbability() { return healthyProbability; }
    public void setHealthyProbability(double healthyProbability) { this.healthyProbability = healthyProbability; }

    public double getRiskScorePercentage() { return riskScorePercentage; }
    public void setRiskScorePercentage(double riskScorePercentage) { this.riskScorePercentage = riskScorePercentage; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getConfidence() { return confidence; }
    public void setConfidence(String confidence) { this.confidence = confidence; }

    public List<NeighborInfo> getNearestNeighbors() { return nearestNeighbors; }
    public void setNearestNeighbors(List<NeighborInfo> nearestNeighbors) { this.nearestNeighbors = nearestNeighbors; }

    public List<String> getRiskFactors() { return riskFactors; }
    public void setRiskFactors(List<String> riskFactors) { this.riskFactors = riskFactors; }

    public List<String> getRecommendations() { return recommendations; }
    public void setRecommendations(List<String> recommendations) { this.recommendations = recommendations; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
