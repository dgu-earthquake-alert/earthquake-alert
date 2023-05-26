package com.example.earthquakealertspring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EarthquakeDto {
    private Integer cnt;
    private Integer fcTp;
    private String img;
    @JsonProperty("inT")
    private String inT;
    private Double lat;
    private String loc;
    private Double lon;
    private Double mt;
    private String rem;
    private Integer stnId;
    private Long tmEqk;
    private Long tmFc;
    private Integer tmSeq;
    private Integer dep;
}