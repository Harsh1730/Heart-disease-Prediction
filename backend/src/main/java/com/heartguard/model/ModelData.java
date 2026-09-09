package com.heartguard.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;

public class ModelData {
    private String algorithm;
    
    @JsonProperty("n_neighbors")
    private int nNeighbors;
    
    private String metric;
    private int p;
    private List<String> columns;
    
    @JsonProperty("scaler_mean")
    private List<Double> scalerMean;
    
    @JsonProperty("scaler_scale")
    private List<Double> scalerScale;
    
    @JsonProperty("fit_X")
    private List<List<Double>> fitX;
    
    private List<Integer> y;
    private List<Integer> classes;
    
    @JsonProperty("total_samples")
    private int totalSamples;
    
    @JsonProperty("class_counts")
    private Map<String, Integer> classCounts;

    public String getAlgorithm() { return algorithm; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }

    public int getnNeighbors() { return nNeighbors; }
    public void setnNeighbors(int nNeighbors) { this.nNeighbors = nNeighbors; }

    public String getMetric() { return metric; }
    public void setMetric(String metric) { this.metric = metric; }

    public int getP() { return p; }
    public void setP(int p) { this.p = p; }

    public List<String> getColumns() { return columns; }
    public void setColumns(List<String> columns) { this.columns = columns; }

    public List<Double> getScalerMean() { return scalerMean; }
    public void setScalerMean(List<Double> scalerMean) { this.scalerMean = scalerMean; }

    public List<Double> getScalerScale() { return scalerScale; }
    public void setScalerScale(List<Double> scalerScale) { this.scalerScale = scalerScale; }

    public List<List<Double>> getFitX() { return fitX; }
    public void setFitX(List<List<Double>> fitX) { this.fitX = fitX; }

    public List<Integer> getY() { return y; }
    public void setY(List<Integer> y) { this.y = y; }

    public List<Integer> getClasses() { return classes; }
    public void setClasses(List<Integer> classes) { this.classes = classes; }

    public int getTotalSamples() { return totalSamples; }
    public void setTotalSamples(int totalSamples) { this.totalSamples = totalSamples; }

    public Map<String, Integer> getClassCounts() { return classCounts; }
    public void setClassCounts(Map<String, Integer> classCounts) { this.classCounts = classCounts; }
}
