import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts'] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Convention : un identifiant préfixé `_` est écarté volontairement.
      // Utilisé pour retirer des props d'un objet avant de propager le reste.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
]

export default config
