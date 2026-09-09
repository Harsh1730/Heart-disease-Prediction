package com.heartguard.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class BatchPredictionRequest {
    @NotEmpty(message = "Patients list cannot be empty")
    @Valid
    private List<PredictionRequest> patients;

    public List<PredictionRequest> getPatients() { return patients; }
    public void setPatients(List<PredictionRequest> patients) { this.patients = patients; }
}
