package com.elijah.backend_resume.controller;

import com.elijah.backend_resume.dto.Visit;
import com.elijah.backend_resume.repository.VisitRepository;
import com.elijah.backend_resume.service.VisitService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class VisitController {
    private final VisitRepository visitRepository;
    private final VisitService visitService;

    @GetMapping("/get")
    ResponseEntity<List<Visit>> getVisits(){
        log.info("getNewVisit called at /get");

        return new ResponseEntity<>( visitRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/new-visit")
    ResponseEntity<Visit> newVisit(){
        log.info("newVisit called at /new-visit");
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        return new ResponseEntity<>(visitService.getSiteVisit(), headers, HttpStatus.OK);
    }


    @PostMapping("/add")
    ResponseEntity<?> addVisit(@RequestBody Visit visit){
        log.info("addVisit called at /add");
        try {
            visitRepository.save(visit);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
