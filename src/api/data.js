import axios from 'axios';

export function getVolcanoTotalNum(path) {
  return axios({
    url: `/fatfree/Volcano-Back/volcano/${path}/total`,
    // url: `/api/volcano/${path}/total`,
    method: 'get',
    urlType: 'api',
  });
}

export function getVolcano(path, page) {
  return axios({
    url: `/fatfree/Volcano-Back/volcano/${path}`,
    // url: `/api/volcano/${path}`,
    params: {
      page: page,
    },
    method: 'get',
    urlType: 'api',
  });
}

export function likeVolcano(path) {
  return axios({
    url: `/fatfree/Volcano-Back/volcano/like/${path}`,
    // url: `/api/volcano/like/${path}`,
    method: 'put',
    urlType: 'api',
  });
}

export function dislikeVolcano(path) {
  return axios({
    url: `/fatfree/Volcano-Back/volcano/dislike/${path}`,
    // url: `/api/volcano/dislike/${path}`,
    method: 'put',
    urlType: 'api',
  });
}

export function getGraphs() {
  return axios({
    url: '/fatfree/Volcano-Back/volcano/learnmore',
    // url: '/api/volcano/learnmore',
    method: 'get',
    urlType: 'api',
  });
}

export function submitForm(formData) {
  return axios({
    url: '/fatfree/Volcano-Back/volcano/report',
    // url: '/api/volcano/report',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    urlType: 'api',
  });
}

export function searchVolcano(type, name) {
  return axios({
    url: `/fatfree/Volcano-Back/volcano/search/${type}/${name}`,
    // url: `/api/volcano/search/${type}/${name}`,
    method: 'get',
    urlType: 'api',
  });
}
