use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

// declare and export the program's entrypoint
entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    // log a message to the blockchain
    msg!("Hello Solana!!");

    // gracefully exit the program
    Ok(())
}

// ProgramId: 8BdR2Z3CEAuekoR9TCSuejihivbCHPnN4ScGVZwuQbSc
