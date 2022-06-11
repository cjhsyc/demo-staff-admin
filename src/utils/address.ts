import DICT from '@/utils/addressDict'

export function getProvinceList(): KeyValue[] {
  const provinceList: KeyValue[] = []
  Object.keys(DICT).forEach((key: string) => {
    if (key.endsWith('0000')) {
      provinceList.push({ key: key, value: DICT[key] })
    }
  })
  return provinceList
}

export function getCityList(provinceCode: string): KeyValue[] {
  if (provinceCode === '') {
    return []
  }
  const cityList: KeyValue[] = []
  Object.keys(DICT).forEach((key: string) => {
    if (
      !key.endsWith('0000') &&
      key.endsWith('00') &&
      key.startsWith(provinceCode.substring(0, 2))
    ) {
      cityList.push({ key: key, value: DICT[key] })
    }
  })
  return cityList
}

export function getCountyList(cityCode: string): KeyValue[] {
  if (cityCode === '') {
    return []
  }
  const countyList: KeyValue[] = []
  Object.keys(DICT).forEach((key: string) => {
    if (!key.endsWith('00') && key.startsWith(cityCode.substring(0, 4))) {
      countyList.push({ key: key, value: DICT[key] })
    }
  })
  return countyList
}

export function getAddress(
  provinceCode: string,
  cityCode: string,
  countyCode: string
): string {
  let address = ''
  if (countyCode) {
    address = DICT[provinceCode] + ' ' + DICT[cityCode] + ' ' + DICT[countyCode]
  } else if (cityCode) {
    address = DICT[provinceCode] + ' ' + DICT[cityCode]
  } else if (provinceCode) {
    address = DICT[provinceCode]
  }
  return address
}

export function getAddressCode(address: string): {
  provinceCode: string
  cityCode: string
  countyCode: string
} {
  let provinceCode = ''
  let cityCode = ''
  let countyCode = ''
  const arr: string[] = address.split(' ')
  if (arr[0]) {
    for (const item of getProvinceList()) {
      if (arr[0] === item.value) {
        provinceCode = item.key
      }
    }
  }
  if (arr[1]) {
    for (const item of getCityList(provinceCode)) {
      if (arr[1] === item.value) {
        cityCode = item.key
      }
    }
  }
  if (arr[2]) {
    for (const item of getCountyList(cityCode)) {
      if (arr[2] === item.value) {
        countyCode = item.key
      }
    }
  }
  return {
    provinceCode,
    cityCode,
    countyCode
  }
}
