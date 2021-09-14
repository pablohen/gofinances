import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  title: string
}

const Welcome = ({title}: Props) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({})
