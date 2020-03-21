import { parse } from 'querystring'
import tokenizeText, { Command } from './tokenize_text'

export type SlaskCommand = {
  command: Command
  arguments: string
  team_id: string
  team_domain: string
  user_id: string
  user_name: string
}

export default (body: string): [string?, SlaskCommand?] => {
  const {
    // Will we need these?
    // channel_id,
    // channel_name,
    // command,
    // enterprise_id,
    // enterprise_name,
    // response_url,
    // trigger_id,

    team_id,
    team_domain,
    text,
    token,
    user_id,
    user_name
  } = parse(body)

  // Becuase we are using querystring, these can come back as arrays
  if (
    Array.isArray(text) ||
    Array.isArray(token) ||
    Array.isArray(team_id) ||
    Array.isArray(team_domain) ||
    Array.isArray(user_id) ||
    Array.isArray(user_name)
  ) {
    return []
  }

  let [cmd, args] = tokenizeText(text)

  if (!cmd) {
    return []
  }

  return [
    token,
    {
      command: cmd,
      arguments: args,
      team_id,
      team_domain,
      user_id,
      user_name
    }
  ]
}
