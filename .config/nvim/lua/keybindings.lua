local function map(mode, combo, mapping, opts)
  local options = {noremap = true}
  if opts then
    options = vim.tbl_extend('force', options, opts)
  end
  vim.api.nvim_set_keymap(mode, combo, mapping, options)
end

map('n', '<S-J>', ':bp<CR>', { silent = true })
map('n', '<S-K>', ':bn<CR>', { silent = true })
map('n', '<C-Q>', ':bd<CR>', { silent = true })
map('n', '<esc>', ':noh<return><esc>', { silent = true, noremap = true })
map('i', '<C-J>', 'pumvisible() ? "<C-n>" : "<Tab>"', { expr = true, noremap = true })
map('i', '<C-K>', 'pumvisible() ? "<C-p>" : "<S-Tab>"', { expr = true, noremap = true })

map('v', '<leader>p', '"_dP')
map('n', '<leader>y', '"+y')
map('v', '<leader>y', '"+y')
map('n', '<leader>Y', 'gg"+yG')
map('n', '<leader>d', '"_d')
map('v', '<leader>d', '"_d')
