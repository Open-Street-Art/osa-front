module.exports = {
 	root: true,
 	env: {
		node: true
  	},
  	extends: [
		'plugin:vue/recommended',
  	],
  	parserOptions: {
		parser: 'babel-eslint'
  	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'semi': ['error', 'always'],
		'indent': ['error', 'tab'],
		'quotes': ['error', 'single', { 'avoidEscape': true } ],
		'vue/html-indent': ['error', 'tab', {
			'attribute': 1,
			'baseIndent': 1,
			'closeBracket': 0,
			'alignAttributesVertically': true,
			'ignores': []
		}],
		'vue/max-attributes-per-line': ['error', {
			'singleline': 1,
			'multiline': {
				'max': 1,
			},
		}],
		'vue/html-closing-bracket-newline': ['error', {
			'singleline': 'never',
			'multiline': 'never',
		}],
		'vue/multiline-html-element-content-newline': ['error', {
			'ignoreWhenEmpty': true,
			'ignores': ['pre', 'textarea'],
			'allowEmptyLines': false
		}]
  	}
};
