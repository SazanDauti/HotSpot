# SimpleAnimation

[![CI Status](http://img.shields.io/travis/keithito/SimpleAnimation.svg?style=flat)](https://travis-ci.org/keithito/SimpleAnimation)
[![Version](https://img.shields.io/cocoapods/v/SimpleAnimation.svg?style=flat)](http://cocoapods.org/pods/SimpleAnimation)
[![License](https://img.shields.io/cocoapods/l/SimpleAnimation.svg?style=flat)](http://cocoapods.org/pods/SimpleAnimation)
[![Platform](https://img.shields.io/cocoapods/p/SimpleAnimation.svg?style=flat)](http://cocoapods.org/pods/SimpleAnimation)
[![Carthage compatible](https://img.shields.io/badge/Carthage-compatible-4BC51D.svg?style=flat)](https://github.com/Carthage/Carthage)

**SimpleAnimation is a UIView extension that makes adding basic animations, like fades and bounces, simple...**

```swift
view.bounceIn(from: .Left)
```
<img src="screenshots/bounceIn.gif" width="240" height="209">


**...with sensible defaults...**

```swift
view.popIn()
```
<img src="screenshots/popIn.gif" width="240" height="212">


**...while remaining customizable**

```swift
view.shake(toward: .Top, amount: 0.5, duration: 2, delay: 0.5)
```
<img src="screenshots/customShake.gif" width="240" height="212">


## Installation

### CocoaPods

SimpleAnimation is available through [CocoaPods](http://cocoapods.org). To install
it, add the following to your `Podfile`:

```ruby
pod "SimpleAnimation"
```

### Carthage

SimpleAnimation is available through [Carthage](https://github.com/Carthage/Carthage). To install
it, add the following to your `Cartfile`:

```
github "keithito/SimpleAnimation"
```


## Supported Animations

SimpleAnimation is a work in progress. So far, the following animations are supported:
  * fadeIn
  * fadeOut
  * slideIn
  * slideOut
  * bounceIn
  * bounceOut
  * popIn
  * popOut
  * hop
  * shake

Please see the [example ViewController](Example/SimpleAnimation/ViewController.swift) for more usage examples. You can launch the example in Xcode with:
```
cd Example
pod install
open SimpleAnimation.xcworkspace
```

## License

SimpleAnimation is available under the MIT license. See the LICENSE file for more info.
