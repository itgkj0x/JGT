import { Button } from '@chakra-ui/react'

// アウトラインボタン
export const OutlineButton_Header = (props) => (
  <Button colorPalette="teal" variant="outline" m="10px" {...props} />
)

// ソリッドボタン
export const SolidButton = (props) => (
  <Button colorPalette="teal" variant="solid" {...props} />
)

// ゴーストボタン
export const GhostButton = (props) => (
  <Button colorPalette="teal" variant="ghost" {...props} />
)
