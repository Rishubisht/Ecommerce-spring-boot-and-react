package com.example.demo.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateRecordException.class)
    public ResponseEntity<?> handleDuplicateRecord(DuplicateRecordException ex) {
        Map<String, String> err = new HashMap<>();
        err.put("msg", ex.getMessage());
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRunTimeExceptions(RuntimeException ex) {


    Map<String, String> err = new HashMap<>();
        err.put("msg",ex.getMessage());
        return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
}
}
