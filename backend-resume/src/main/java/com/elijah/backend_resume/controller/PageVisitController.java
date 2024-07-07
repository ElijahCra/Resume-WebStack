package com.elijah.backend_resume.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class PageVisitController {
    private int pageVisitCount = 0;

    @PostMapping("/pagevisit")
    public int incrementPageVisitCount() {
        return ++pageVisitCount;
    }
}
