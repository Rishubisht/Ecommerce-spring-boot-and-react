package com.example.demo.Exception;

public class DuplicateRecordException extends RuntimeException{

    public DuplicateRecordException(String msg){
        super(msg);
    }
}
