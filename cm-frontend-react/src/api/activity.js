import request from '@/utils/request'

/**
 * Created by Lingjun Meng on 15/4/2022
 */

export function getActivityByAccessToken(query) {
  return request({
    url: '/activity/getActivityByAccessToken',
    method: 'post',
    params: query
  })
}

export function getActivityDetailsByAccessToken(query) {
  return request({
    url: '/activity/getActivityDetailsByAccessToken',
    method: 'post',
    params: query
  })
}

export function getActivityDetailsByActivityId(query) {
  return request({
    url: '/activity/getActivityDetailsByActivityId',
    method: 'post',
    params: query
  })
}

export function getActivityByAccessTokenAndType(query) {
  return request({
    url: '/activity/getActivityByAccessTokenAndType',
    method: 'post',
    params: query
  })
}


export function getDashboardStatisticsByAccessToken(query) {
  return request({
    url: '/activity/getDashboardStatisticsByAccessToken',
    method: 'post',
    params: query
  })
}

