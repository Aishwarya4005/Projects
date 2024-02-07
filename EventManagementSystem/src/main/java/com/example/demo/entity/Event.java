package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Entity
@Table(name="event")
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="event_id")
	private int event_id;
	@Column(name="event_name")
	 private String modelEventName;
	@NotBlank(message="modelEventName can not be empty")
	@Size(max=20,message="modelEventName can't be more than 20 characters")
    @Size(min=5,message="modelEventName must be more than 5 characters")
   
	 @Column(name="imagepath")
	private String imagepath;
	
	@NotNull(message="price cannot be null")
	@Positive(message="price value should be positive")
	private Double price;
	public Event() {
		
	}
	


	public Event(int event_id, String modelEventName,
			@NotBlank(message = "modelEventName can not be empty") @Size(max = 20, message = "modelEventName can't be more than 20 characters") @Size(min = 5, message = "modelEventName must be more than 4 characters") String imagepath,
			@NotNull(message = "price cannot be null") @Positive(message = "price value should be positive") Double price) {
		super();
		this.event_id = event_id;
		this.modelEventName = modelEventName;
		this.imagepath = imagepath;
		this.price = price;
	}



	public int getEvent_id() {
		return event_id;
	}

	public void setEvent_id(int event_id) {
		this.event_id = event_id;
	}
	public String getModelEventName() {
		return modelEventName;
	}
	public void setModelEventName(String modelEventName) {
		this.modelEventName = modelEventName;
	}
	public String getImagepath() {
		return imagepath;
	}
	public void setImagepath(String imagepath) {
		this.imagepath = imagepath;
	}
	
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}



	@Override
	public String toString() {
		return "Event [event_id=" + event_id + ", modelEventName=" + modelEventName + ", imagepath=" + imagepath
				+ ", price=" + price + "]";
	}



	
}
	