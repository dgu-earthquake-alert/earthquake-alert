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
    private String tmEqk; //지진 실제 발생 시각
    private String tmFc; //통보문 발생 시각
    private Integer tmSeq;
    private Integer dep;
}