package com.heartguard.dto;

public class PresetPatient {
    private String id;
    private String title;
    private String description;
    private String category;
    private String expectedOutcome;
    private PredictionRequest data;

    public PresetPatient() {}

    public PresetPatient(String id, String title, String description, String category, String expectedOutcome, PredictionRequest data) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.expectedOutcome = expectedOutcome;
        this.data = data;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getExpectedOutcome() { return expectedOutcome; }
    public void setExpectedOutcome(String expectedOutcome) { this.expectedOutcome = expectedOutcome; }

    public PredictionRequest getData() { return data; }
    public void setData(PredictionRequest data) { this.data = data; }
}
