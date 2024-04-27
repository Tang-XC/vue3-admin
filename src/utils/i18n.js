import i18n from '@/local'
export function generateTitle(title) {
  return i18n.global.t('route.' + title)
}
