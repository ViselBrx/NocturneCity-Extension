# Nocturne City

Tema escuro para Visual Studio Code com a atmosfera de uma cidade na madrugada: asfalto quase preto, superfícies azuladas e detalhes neon discretos. O foco é manter o código legível durante longas sessões.

## Paleta

| Papel | Cor |
| --- | --- |
| Fundo do editor | `#080B12` |
| Sidebar e painéis | `#0D121D` |
| Superfícies elevadas | `#111827` |
| Seleção | `#242D43` |
| Texto principal | `#CDD6E8` |
| Comentários | `#626F89` |
| Keywords | `#B39DFF` |
| Tipos e classes | `#71DCEB` |
| Funções e métodos | `#82A9FF` |
| Strings | `#A3D9B1` |
| Números | `#EBCB8B` |

## Instalação para teste

Instale o arquivo `nocturne-city-theme-0.1.0.vsix` pelo comando **Extensions: Install from VSIX...** no VS Code. Também é possível executar:

```powershell
code --install-extension .\nocturne-city-theme-0.1.0.vsix
```

Depois, abra **Preferences: Color Theme** e selecione **Nocturne City**. Para testar diretamente o código fonte, abra esta pasta no VS Code e pressione `F5`.

O tema inclui cores de interface, terminal, Git, diagnósticos, sintaxe e tokens semânticos. Foi preparado para JavaScript, TypeScript, HTML, CSS, JSON, Python e SQL.

## Publicação

O manifesto usa `nocturne-city` como `publisher`. Antes de publicar no Visual Studio Marketplace ou no Open VSX, confirme que você controla esse identificador nas duas plataformas. Se precisar alterá-lo, gere novamente o VSIX após atualizar o `package.json`.

## Licença

MIT. Consulte [LICENSE](LICENSE).
