
export const hasProperty = <DTO extends object>(propertyName: string, dto: DTO): boolean => {
    return propertyName in dto;
}

export const hasSomeProperties = <DTO extends object>(propertyNames: string[], dto: DTO): boolean => {
    return propertyNames.map(name => hasProperty(name, dto)).filter(v => !!v).length >0;
}

export const patchPropertyHandler = <DTO extends object, Alt>(propertyName: string, dto: DTO, alt: Alt): Alt => {
    return hasProperty(propertyName, dto) ? dto[propertyName] : alt;
}
