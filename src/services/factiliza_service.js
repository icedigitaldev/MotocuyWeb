
const options = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNzk1NCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImNvbnN1bHRvciJ9.heWue9Wct6SNQMpuDdbeJHQCLxCDLppSPF0CzUng7GQ'
  }
};

export function fetchLicenciaInfo(dni) {
  return fetch(`https://api.factiliza.com/v1/dni/info/${dni}`, options)
    .then(response => response.json())
    .catch(err => {
      console.error(err);
      throw err;
    });
}

export function fetchPlacaInfo(placa) {
  return fetch(`https://api.factiliza.com/v1/placa/info/${placa}`, options)
    .then(response => response.json())
    .catch(err => {
      console.error(err);
      throw err;
    });
}


