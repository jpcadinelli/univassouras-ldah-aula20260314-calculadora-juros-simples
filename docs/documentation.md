# Requisito - Calculo de Juros Simples

## Descricao

O sistema deve calcular o valor de juros simples com base no capital, taxa de juros e tempo informados pelo usuario.

## Formula de Calculo

`J = C * i * t`

Onde:

- `J` = valor dos juros
- `C` = capital (valor inicial)
- `i` = taxa de juros
- `t` = tempo

## Regras de Negocio

### RN01 - Conversao da Taxa de Juros

A taxa de juros informada em percentual deve ser convertida para numero decimal antes da aplicacao na formula.

Exemplos:

- `5%` -> `0,05`
- `10%` -> `0,10`

Regra de conversao:

`taxaDecimal = taxaPercentual / 100`

### RN02 - Consistencia da Unidade de Tempo

A taxa de juros (`i`) e o tempo (`t`) devem estar na mesma unidade temporal.

Exemplos validos:

| Taxa | Tempo |
| --- | --- |
| 5% ao mes | 10 meses |
| 8% ao ano | 2 anos |

Exemplos invalidos:

| Taxa | Tempo |
| --- | --- |
| 5% ao mes | 2 anos |

### RN03 - Parametros obrigatorios

Para realizar o calculo, o sistema deve receber:

- Capital (`C`) maior que `0`
- Taxa de juros (`i`) maior que `0`
- Tempo (`t`) maior que `0`

Caso algum valor seja invalido ou ausente, o sistema deve retornar erro de validacao.

## Resultado esperado

Apos a aplicacao da formula, o sistema deve retornar:

- Valor dos juros (`J`)

Opcionalmente, pode ser calculado tambem:

- `Montante = Capital + Juros`
