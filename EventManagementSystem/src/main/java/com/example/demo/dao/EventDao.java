package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Event;


@Repository
public interface EventDao extends JpaRepository<Event, Integer>{
	List<Event> findByModelEventNameIgnoreCase(String modelEventName);
	

}
