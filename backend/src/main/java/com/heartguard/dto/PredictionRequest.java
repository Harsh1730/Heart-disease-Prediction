package com.heartguard.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PredictionRequest {
    private String patientId;
    private String patientName;

    @NotNull(message = "Age is required")
    @Min(value = 1, message = "Age must be at least 1")
    @Max(value = 120, message = "Age must be less than 120")
    private Integer age;

    @NotBlank(message = "Sex is required (M or F)")
    private String sex; // M or F

    @NotBlank(message = "Chest pain type is required (TA, ATA, NAP, ASY)")
    private String chestPainType; // TA, ATA, NAP, ASY

    @NotNull(message = "Resting BP is required")
    @Min(value = 40, message = "Resting BP must be realistic (>= 40)")
    @Max(value = 260, message = "Resting BP must be realistic (<= 260)")
    private Integer restingBP;

    @NotNull(message = "Cholesterol is required")
    @Min(value = 0, message = "Cholesterol cannot be negative")
    @Max(value = 700, message = "Cholesterol must be realistic (<= 700)")
    private Integer cholesterol;

    @NotNull(message = "Fasting blood sugar is required (0: <= 120 mg/dl, 1: > 120 mg/dl)")
    private Integer fastingBS; // 0 or 1

    @NotBlank(message = "Resting ECG is required (Normal, ST, LVH)")
    private String restingECG; // Normal, ST, LVH

    @NotNull(message = "Max heart rate is required")
    @Min(value = 40, message = "Max HR must be >= 40")
    @Max(value = 240, message = "Max HR must be <= 240")
    private Integer maxHR;

    @NotBlank(message = "Exercise angina is required (Y or N)")
    private String exerciseAngina; // Y or N

    @NotNull(message = "Oldpeak ST depression is required")
    private Double oldpeak;

    @NotBlank(message = "ST Slope is required (Up, Flat, Down)")
    private String stSlope; // Up, Flat, Down

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }

    public String getChestPainType() { return chestPainType; }
    public void setChestPainType(String chestPainType) { this.chestPainType = chestPainType; }

    public Integer getRestingBP() { return restingBP; }
    public void setRestingBP(Integer restingBP) { this.restingBP = restingBP; }

    public Integer getCholesterol() { return cholesterol; }
    public void setCholesterol(Integer cholesterol) { this.cholesterol = cholesterol; }

    public Integer getFastingBS() { return fastingBS; }
    public void setFastingBS(Integer fastingBS) { this.fastingBS = fastingBS; }

    public String getRestingECG() { return restingECG; }
    public void setRestingECG(String restingECG) { this.restingECG = restingECG; }

    public Integer getMaxHR() { return maxHR; }
    public void setMaxHR(Integer maxHR) { this.maxHR = maxHR; }

    public String getExerciseAngina() { return exerciseAngina; }
    public void setExerciseAngina(String exerciseAngina) { this.exerciseAngina = exerciseAngina; }

    public Double getOldpeak() { return oldpeak; }
    public void setOldpeak(Double oldpeak) { this.oldpeak = oldpeak; }

    public String getStSlope() { return stSlope; }
    public void setStSlope(String stSlope) { this.stSlope = stSlope; }
}
