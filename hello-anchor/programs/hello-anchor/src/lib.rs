use anchor_lang::prelude::*;

declare_id!("9qykhyh6E1f8bLDqgzcoeD43xb4x8RPs1KuDEvL8rPFp");

#[program]
pub mod hello_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
