export const getAudioAssetUrl = (name:string) => {
    return new URL(`/src/assets/audio/${name}`, import.meta.url)
}