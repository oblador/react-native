/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} = React;

var ImageCapInsetsExample = require('./ImageCapInsetsExample');

var NetworkImageExample = React.createClass({
  watchID: (null: ?number),

  getInitialState: function() {
    return {
      error: false,
      loading: false,
      progress: 0
    };
  },
  render: function() {
    var loader = this.state.loading ?
      <View style={styles.progress}>
        <Text>{this.state.progress}%</Text>
        <ActivityIndicatorIOS style={{marginLeft:5}}/>
      </View> : null;
    return this.state.error ?
      <Text>{this.state.error}</Text> :
      <Image
        source={this.props.source}
        style={[styles.base, {overflow: 'visible'}]}
        onLoadStart={(e) => this.setState({loading: true})}
        onError={(e) => this.setState({error: e.nativeEvent.error, loading: false})}
        onProgress={(e) => this.setState({progress: Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total)})}
        onLoad={() => this.setState({loading: false, error: false})}>
        {loader}
      </Image>;
  }
});

exports.displayName = (undefined: ?string);
exports.framework = 'React';
exports.title = '<Image>';
exports.description = 'Base component for displaying different types of images.';

exports.examples = [
  {
    title: 'Plain Network Image',
    description: 'If the `source` prop `uri` property is prefixed with ' +
    '"http", then it will be downloaded from the network.',
    render: function() {
      return (
        <Image
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          style={styles.base}
        />
      );
    },
  },
  {
    title: 'Plain Static Image',
    description: 'Static assets should be required by prefixing with `image!` ' +
      'and are located in the app bundle.',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image source={require('image!uie_thumb_normal')} style={styles.icon} />
          <Image source={require('image!uie_thumb_selected')} style={styles.icon} />
          <Image source={require('image!uie_comment_normal')} style={styles.icon} />
          <Image source={require('image!uie_comment_highlighted')} style={styles.icon} />
        </View>
      );
    },
  },
  {
    title: 'Error Handler',
    render: function() {
      return (
        <NetworkImageExample source={{uri: 'http://TYPO_ERROR_facebook.github.io/react/img/logo_og.png'}} />
      );
    },
    platform: 'ios',
  },
  {
    title: 'Image Download Progress',
    render: function() {
      return (
        <NetworkImageExample source={{uri: 'http://facebook.github.io/origami/public/images/blog-hero.jpg?r=1'}}/>
      );
    },
    platform: 'ios',
  },
  {
    title: 'Border Color',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            source={smallImage}
            style={[
              styles.base,
              styles.background,
              {borderWidth: 3, borderColor: '#f099f0'}
            ]}
          />
        </View>
      );
    },
    platform: 'ios',
  },
  {
    title: 'Border Width',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            source={smallImage}
            style={[
              styles.base,
              styles.background,
              {borderWidth: 5, borderColor: '#f099f0'}
            ]}
          />
        </View>
      );
    },
    platform: 'ios',
  },
  {
    title: 'Border Radius',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            style={[styles.base, {borderRadius: 5}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {borderRadius: 19}]}
            source={fullImage}
          />
        </View>
      );
    },
  },
  {
    title: 'Background Color',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image source={smallImage} style={styles.base} />
          <Image
            style={[
              styles.base,
              styles.leftMargin,
              {backgroundColor: 'rgba(0, 0, 100, 0.25)'}
            ]}
            source={smallImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {backgroundColor: 'red'}]}
            source={smallImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {backgroundColor: 'black'}]}
            source={smallImage}
          />
        </View>
      );
    },
  },
  {
    title: 'Opacity',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            style={[styles.base, {opacity: 1}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.8}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.6}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.4}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.2}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0}]}
            source={fullImage}
          />
        </View>
      );
    },
  },
  {
    title: 'Nesting',
    render: function() {
      return (
        <Image
          style={{width: 60, height: 60, backgroundColor: 'transparent'}}
          source={fullImage}>
          <Text style={styles.nestedText}>
            React
          </Text>
        </Image>
      );
    },
  },
  {
    title: 'Tint Color',
    description: 'The `tintColor` style prop changes all the non-alpha ' +
      'pixels to the tint color.',
    render: function() {
      return (
        <View>
          <View style={styles.horizontal}>
            <Image
              source={require('image!uie_thumb_normal')}
              style={[styles.icon, {borderRadius: 5, tintColor: '#5ac8fa' }]}
            />
            <Image
              source={require('image!uie_thumb_normal')}
              style={[styles.icon, styles.leftMargin, {borderRadius: 5, tintColor: '#4cd964' }]}
            />
            <Image
              source={require('image!uie_thumb_normal')}
              style={[styles.icon, styles.leftMargin, {borderRadius: 5, tintColor: '#ff2d55' }]}
            />
            <Image
              source={require('image!uie_thumb_normal')}
              style={[styles.icon, styles.leftMargin, {borderRadius: 5, tintColor: '#8e8e93' }]}
            />
          </View>
          <Text style={styles.sectionText}>
            It also works with downloaded images:
          </Text>
          <View style={styles.horizontal}>
            <Image
              source={smallImage}
              style={[styles.base, {borderRadius: 5, tintColor: '#5ac8fa' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#4cd964' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#ff2d55' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#8e8e93' }]}
            />
          </View>
        </View>
      );
    },
  },
  {
    title: 'Resize Mode',
    description: 'The `resizeMode` style prop controls how the image is ' +
      'rendered within the frame.',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <View>
            <Text style={[styles.resizeModeText]}>
              Contain
            </Text>
            <Image
              style={styles.resizeMode}
              resizeMode={Image.resizeMode.contain}
              source={fullImage}
            />
          </View>
          <View style={styles.leftMargin}>
            <Text style={[styles.resizeModeText]}>
              Cover
            </Text>
            <Image
              style={styles.resizeMode}
              resizeMode={Image.resizeMode.cover}
              source={fullImage}
            />
          </View>
          <View style={styles.leftMargin}>
            <Text style={[styles.resizeModeText]}>
              Stretch
            </Text>
            <Image
              style={styles.resizeMode}
              resizeMode={Image.resizeMode.stretch}
              source={fullImage}
            />
          </View>
        </View>
      );
    },
  },
  {
    title: 'Cap Insets',
    description:
      'When the image is resized, the corners of the size specified ' +
      'by capInsets will stay a fixed size, but the center content and ' +
      'borders of the image will be stretched. This is useful for creating ' +
      'resizable rounded buttons, shadows, and other resizable assets.',
    render: function() {
      return <ImageCapInsetsExample />;
    },
    platform: 'ios',
  },
];

var fullImage = {uri: 'http://facebook.github.io/react/img/logo_og.png'};
var smallImage = {uri: 'http://facebook.github.io/react/img/logo_small_2x.png'};

var styles = StyleSheet.create({
  base: {
    width: 38,
    height: 38,
  },
  progress: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: 100
  },
  leftMargin: {
    marginLeft: 10,
  },
  background: {
    backgroundColor: '#222222'
  },
  sectionText: {
    marginVertical: 6,
  },
  nestedText: {
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: 'transparent',
    color: 'white'
  },
  resizeMode: {
    width: 90,
    height: 60,
    borderWidth: 0.5,
    borderColor: 'black'
  },
  resizeModeText: {
    fontSize: 11,
    marginBottom: 3,
  },
  icon: {
    width: 15,
    height: 15,
  },
  horizontal: {
    flexDirection: 'row',
  }
});
