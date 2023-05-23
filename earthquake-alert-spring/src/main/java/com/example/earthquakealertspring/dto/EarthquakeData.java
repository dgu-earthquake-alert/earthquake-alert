
package com.example.earthquakealertspring.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EarthquakeData {
    private String lat;
    private String lon;
    private String mt;
    private String loc;
}
