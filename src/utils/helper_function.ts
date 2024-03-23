export const getAudioAssetUrl = (name:string) => {
    return new URL(`/public/audio/${name}`, import.meta.url)
}