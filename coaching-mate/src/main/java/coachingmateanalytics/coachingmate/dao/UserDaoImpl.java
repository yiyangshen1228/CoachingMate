package coachingmateanalytics.coachingmate.dao;


import java.util.List;


import coachingmateanalytics.coachingmate.common.utils.Consts;

import com.mongodb.client.result.UpdateResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import coachingmateanalytics.coachingmate.entity.UserPartner;

@Component
public class UserDaoImpl implements UserDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    /***
     * @Date 23:24 22/9/20
     * @Description: test remote mongodb using collection name
     * @param user
     * @return {@link }
     */
    public void saveUser(UserPartner user) {
        mongoTemplate.save(user, Consts.MONGODB_USER_COLLECTIN_NAME); // save user to mongodb 
    }

    public UserPartner findUserByUsername(String username) {
        Query query=new Query(Criteria.where("username").is(username)); // query by username in mongodb 
        UserPartner user =  mongoTemplate.findOne(query , UserPartner.class,Consts.MONGODB_USER_COLLECTIN_NAME); // find user by username in mongodb 
        return user;
    }
    
    public UserPartner findUserByEmail(String email) {
        Query query=new Query(Criteria.where("email").is(email)); // query by email in mongodb 
        UserPartner user =  mongoTemplate.findOne(query , UserPartner.class,Consts.MONGODB_USER_COLLECTIN_NAME); // find user by email in mongodb 
        return user;
    }


    public int updateUser(UserPartner user) {
        Query query=new Query(Criteria.where("username").is(user.getUsername())); // query by username in mongodb 
        Update update= Update.update("userAccessToken", user.getUserAccessToken()).set("userAccessSecret", user.getUserAccessSecret()); // update userAccessToken and userAccessSecret in mongodb 
        update.set("token", user.getToken()); // update token in mongodb
        update.set("tokenDate", user.getTokenDate());
        UpdateResult result =mongoTemplate.updateMulti(query,update,UserPartner.class,Consts.MONGODB_USER_COLLECTIN_NAME); // update user in mongodb 
        return (int) result.getMatchedCount(); // return matched count in mongodb 
    }
//    @Override
    public int getMaxUserid() {
    	Query query=new Query(); // query all users in mongodb 
    	query.with(Sort.by(Sort.Direction.DESC, "userId")); // sort users by userId in descending order 
    	List<UserPartner> users = mongoTemplate.find(query, UserPartner.class,Consts.MONGODB_USER_COLLECTIN_NAME); // find all users in mongodb 
    	if(users.size()==0) { // if no users in mongodb 
    		return 0; // return 0 
    	}
    	return (int) users.get(0).getUserId(); // return userId of the first user in mongodb 
    }

    @Override
    public void deleteUserByUsername(String username) { // delete user by username in mongodb 
        Query query=new Query(Criteria.where("username").is(username)); // query by username in mongodb 
        mongoTemplate.remove(query,UserPartner.class,Consts.MONGODB_USER_COLLECTIN_NAME); // delete user by username in mongodb 
    }

    @Override
    public UserPartner selectUserByToken(String token) { // select user by token in mongodb 
        Query query=new Query(Criteria.where("token").is(token)); // query by token in mongodb 
        return mongoTemplate.findOne(query , UserPartner.class,Consts.MONGODB_USER_COLLECTIN_NAME); // find user by token in mongodb 
    }

}
