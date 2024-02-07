package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@Table(name="participants")
public class Participants {
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="participant_id")
	private long participantId;
	
	@NotNull(message="name cannot be null")
	@Size(min=2,max=15, message="participant name should be between 2 and 15")
	private String name;
	
	@NotBlank(message="contactno should not blank")
	@Pattern(regexp = "[0-9]+", message = "Customer phone must contain only digits")
	@Size(min=10,max=12,message="contactno must be between 10 and 12")
	private String contactno;
	
	@NotBlank(message = "Username cannot be blank")
    @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters")
	private String username;
	
	@NotBlank(message = "User password cannot be blank")
    @Size(min = 6, message = "User password must be at least 6 characters")
	private String password;
	
	   @NotBlank(message = "Email cannot be blank")
	    @Email(message = "Invalid email format")
	private String email;
	   
	   public Participants() {
		   
	   }

	public Participants(long participantId,String name,String contactno,String username,String password,String email) {
		super();
		this.participantId = participantId;
		this.name = name;
		this.contactno = contactno;
		this.username = username;
		this.password = password;
		this.email = email;
	}

	

	public long getParticipantId() {
		System.out.println("participantId ="+participantId );
		return participantId;
	}

	public void setParticipantId(long participantId) {
		this.participantId = participantId;
	}

	public String getName() {
		System.out.println("name= "+name );
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContactno() {
		System.out.println("contactno= "+contactno );
		return contactno;
	}

	public void setContactno(String contactno) {
		this.contactno = contactno;
	}

	public String getUsername() {
		System.out.println("getUsername= "+ username);
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		System.out.println("getPassword= "+password );
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Participants [participant_id=" + participantId + ", name=" + name + ", contactno=" + contactno
				+ ", username=" + username + ", password=" + password + ", email=" + email + "]";
	}
	   
	   

}
