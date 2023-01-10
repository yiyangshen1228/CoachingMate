/**
 * Created by Lingjun Meng on 15/4/2022
 */

import request from '@/utils/request'

export function requestToken(data) {
  return request({
    url: '/auth/requestToken',
    method: 'post',
    params: data
  })
}
