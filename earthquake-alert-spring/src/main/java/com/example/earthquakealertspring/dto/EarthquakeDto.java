
package com.example.earthquakealertspring.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EarthquakeDto {
    //위도 경도
    private String lat;
    private String lon;
    //규모
    private String mt;
    //상세주소
    private String loc;
}
