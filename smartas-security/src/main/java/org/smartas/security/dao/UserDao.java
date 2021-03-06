/**
 * 
 */
package org.smartas.security.dao;

import org.smartas.core.BaseDao;
import org.smartas.security.model.User;

/**
 * @author chenb
 *
 */
public interface UserDao extends BaseDao<User> {

	User findByUserAcount(String username);
}
