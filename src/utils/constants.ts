export enum ErrorToggleCodeEnum {
    None,
    PowerErr,
    HeadsetErr,
    LocationErr,
}
export function getErrorToggleCodeEnumList(): Array<ErrorToggleCodeEnum> {
    return [ErrorToggleCodeEnum.PowerErr,ErrorToggleCodeEnum.HeadsetErr, ErrorToggleCodeEnum.LocationErr];
}

export enum DetectTheftEnum {
    None,
    Power,
    Headset,
    Location,
}
