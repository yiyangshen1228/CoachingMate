package coachingmateanalytics.coachingmate.entity;

import io.swagger.annotations.ApiModel;

import java.util.Date;

@ApiModel
public class UserPartner {
    private long userId;
    private String username;
    private String fullname;
    private String email;
    private String token;
    private String userAccessToken;
    private Date tokenDate;
    private String userAccessSecret;
    private String password;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserAccessSecret() {
        return userAccessSecret;
    }

    public void setUserAccessSecret(String userAccessSecret) {
        this.userAccessSecret = userAccessSecret;
    }

    public UserPartner() {
        super();
    }

    public UserPartner(String username, String userAccessToken) {
        super();
        this.username = username;
        this.userAccessToken = userAccessToken;

    }
    public UserPartner(String username, String userAccessToken, String userAccessSecret) {
        super();
        this.username = username;
        this.userAccessToken = userAccessToken;
        this.userAccessSecret = userAccessSecret;

    }

    public UserPartner(long userId, String username, String userAccessToken, String userAccessSecret, String password, String fullname, String email) {
        this.userId = userId;
        this.username = username;
        this.userAccessToken = userAccessToken;
        this.userAccessSecret = userAccessSecret;
        this.password = password;
        this.fullname=fullname;
        this.email=email;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
    public String getFullname() {
    	return fullname;
    }

    public void setFullname(String fullname) {
    	this.fullname = fullname;
    }

    public String getEmail() {
    	return email;
    }

    public void setEmail(String email) {
    	this.email = email;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserAccessToken() {
        return userAccessToken;
    }

    public void setUserAccessToken(String userAccessToken) {
        this.userAccessToken = userAccessToken;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getTokenDate() {
        return tokenDate;
    }

    public void setTokenDate(Date tokenDate) {
        this.tokenDate = tokenDate;
    }

    @Override
    public String toString()
    {
        return "UserPartner [userId=" + userId + ", userName=" + username + ",fullName=\" + fullname + \",email=\" + email + \", userAccessToken=" + userAccessToken
                + ", userAccessSecret=" + userAccessSecret + "]";
    }

}