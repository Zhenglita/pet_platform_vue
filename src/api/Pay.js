import request from '@/utils/request'

export const payAPI = function (total, no) {
  return request.get('/pay/alipay' + '?dona_money=' + total + 'and dona_id=' + no)
}
